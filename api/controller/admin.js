const express = require("express");
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");
const adminAuth = require("../middleware/adminAuth");
const adminToken = require("../utils/adminToken");

const router = express.Router();

// Admin Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await Admin.findOne({ email })) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "Admin registered successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the Admin collection
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    if (!(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate admin token
    adminToken(admin, 200, res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Admin Logout
router.get("/logout", adminAuth, (req, res) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Admin Dashboard
router.get("/admin-dashboard", adminAuth, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Admin Dashboard" });
});

// Get Admin Profile
router.get("/profile", adminAuth, async (req, res) => {
  try {
    console.log("📌 Checking Admin Role: req.admin:", req.admin); // Debugging

    if (!req.admin) {
      console.error("❌ Admin not found in request object");
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ success: true, admin: req.admin });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Update Admin Profile
router.put("/profile", adminAuth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");
    res.status(200).json({ success: true, updatedAdmin });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Reset Admin Password
router.put("/reset-password", adminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);
    if (!admin || !(await bcrypt.compare(currentPassword, admin.password))) {
      return res.status(400).json({ success: false, message: "Invalid current password" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
