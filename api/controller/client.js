const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../model/client");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const ACTIVATION_SECRET = process.env.ACTIVATION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

// Create Activation Token
const createActivationToken = (client) => {
  return jwt.sign(client, ACTIVATION_SECRET, { expiresIn: "5m" });
};

// Create Client
router.post(
  "/create-client",
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;

    console.log("Received request to create client:", { name, email });

    if (!avatar) {
      return next(new ErrorHandler("Avatar is required", 400));
    }

    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return next(new ErrorHandler("Client already exists", 400));
    }

    let myCloud;
    try {
      myCloud = await cloudinary.uploader.upload(avatar, { folder: "avatars" });
      console.log("Avatar uploaded successfully:", myCloud.secure_url);
    } catch (uploadError) {
      console.error("Error uploading avatar to Cloudinary:", uploadError);
      return next(new ErrorHandler("Failed to upload avatar", 500));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = {
      name,
      email,
      password: hashedPassword,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    };
    const activationToken = createActivationToken(client);
    const activationUrl = `${CLIENT_URL}/activation/${activationToken}`;

    try {
      console.log("Sending activation email to:", email);
      await sendMail({
        email,
        subject: "Activate your account",
        message: `Hello ${name}, please click the link to activate your account: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email (${email}) to activate your account!`,
      });
    } catch (mailError) {
      console.error("Error sending activation email:", mailError);
      return next(new ErrorHandler("Failed to send activation email", 500));
    }
  })
);

// Activate Client
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    const { activation_token } = req.body;
    let newClient;

    try {
      newClient = jwt.verify(activation_token, ACTIVATION_SECRET);
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired activation token", 400));
    }

    const { name, email, password, avatar } = newClient;
    let client = await Client.findOne({ email });

    if (client) {
      return next(new ErrorHandler("Client already exists", 400));
    }

    client = await Client.create({ name, email, password, avatar });
    sendToken(client, 201, res);
  })
);

// Login Client/Admin
router.post(
  "/login-client",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required!", 400));
    }

    const client = await Client.findOne({ email }).select("+password");
    if (!client) {
      return next(new ErrorHandler("User does not exist!", 400));
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Incorrect credentials", 400));
    }

    sendToken(client, 200, res);
  })
);

// Logout Client
router.post(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Log out successful!",
    });
  })
);

// Load Client (Authenticated)
router.get(
  "/getclient",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const client = await Client.findById(req.user.id);

    if (!client) {
      return next(new ErrorHandler("Client does not exist", 400));
    }

    res.status(200).json({ success: true, client });
  })
);

// Admin - Get All Clients
router.get(
  "/admin-all-clients",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const clients = await Client.find();
    res.status(200).json({ success: true, clients });
  })
);

// Admin - Reset Password (Now Sends Email Instead of Direct Reset)
router.post(
  "/reset-admin-password",
  catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }

    const admin = await Client.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const resetToken = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetUrl = `${CLIENT_URL}/reset-password/${resetToken}`;

    try {
      await sendMail({
        email,
        subject: "Password Reset Request",
        message: `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link expires in 15 minutes.`,
      });

      res.status(200).json({
        success: true,
        message: "Password reset email sent! Check your inbox.",
      });
    } catch (mailError) {
      console.error("Error sending reset email:", mailError);
      return next(new ErrorHandler("Failed to send reset email", 500));
    }
  })
);

module.exports = router;
