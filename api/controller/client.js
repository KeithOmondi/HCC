const express = require("express");
//const Client = require("../model/client");
const router = express.Router();
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const Client = require("../model/client")
//const crypto = require("crypto");

// create client
router.post("/create-client", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    console.log("Received request to create client:", { name, email }); // Log incoming request data

    const clientEmail = await Client.findOne({ email });

    if (clientEmail) {
      console.warn("Client already exists:", email); // Log warning if user exists
      return next(new ErrorHandler("Client already exists", 400));
    }

    if (!avatar) {
      console.error("Avatar missing in request body");
      return next(new ErrorHandler("Avatar is required", 400));
    }

    let myCloud;
    try {
      myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      console.log("Avatar uploaded successfully:", myCloud.secure_url);
    } catch (uploadError) {
      console.error("Error uploading avatar to Cloudinary:", uploadError);
      return next(new ErrorHandler("Failed to upload avatar", 500));
    }

    const client = {
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    const activationToken = createActivationToken(client);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      console.log("Sending activation email to:", email);
      await sendMail({
        email: client.email,
        subject: "Activate your account",
        message: `Hello ${client.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${client.email} to activate your account!`,
      });
    } catch (mailError) {
      console.error("Error sending activation email:", mailError);
      return next(new ErrorHandler("Failed to send activation email", 500));
    }
  } catch (error) {
    console.error("Unexpected server error:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (client) => {
  return jwt.sign(client, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate client
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newClient = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newClient) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newClient;

      let client = await Client.findOne({ email });

      if (client) {
        return next(new ErrorHandler("Client already exists", 400));
      }
      client = await Client.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(client, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//create admin
const createAdminIfNotExists = async () => {
  try {
    const existingAdmin = await Client.findOne({ role: "admin" });

    if (!existingAdmin) {
      const oneTimePassword = "Admin@1234"; // Default one-time password
      const hashedPassword = await bcrypt.hash(oneTimePassword, 10);

      const admin = await Client.create({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        forcePasswordChange: true, // Flag to force password reset
      });

      console.log("Admin created with default password:", oneTimePassword);
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdminIfNotExists();

// Login client/admin
router.post("/login-client", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Check if email & password exist
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // 🔹 Fetch client & include password field explicitly
    const client = await Client.findOne({ email }).select("+password");

    if (!client) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔹 Compare password correctly
    const isPasswordValid = await client.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔹 Generate JWT token
    const token = client.getJwtToken();

    res.status(200).json({
      success: true,
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        phoneNumber: client.phoneNumber,
        role: client.role,
        avatar: client.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});





// load client
router.get(
  "/getclient",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const client = await Client.findById(req.client.id);

      if (!client) {
        return next(new ErrorHandler("Client doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        client,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/admin-all-clients",
  isAuthenticated,
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const clients = await Client.find();
      res.status(200).json({
        success: true,
        clients,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//admin password reset
router.post("/reset-admin-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Please provide all fields!" });
  }

  const admin = await Client.findOne({ email, role: "admin" });

  if (!admin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedPassword;
  admin.forcePasswordChange = false; // Remove flag after reset

  await admin.save();

  res
    .status(200)
    .json({ message: "Password updated successfully. You can now log in." });
});

module.exports = router;
