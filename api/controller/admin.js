const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../model/admin");
const adminAuth = require("../middleware/adminAuth");
const adminToken = require("../utils/adminToken");
const router = express.Router();

// Admin Registration (For first-time setup)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    // ✅ Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      name,
      email,
      password: hashedPassword, // ✅ Store hashed password
    });

    await admin.save();

    // ✅ Generate token and send response
    adminToken(admin, 201, res); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //console.log("🛠️ Admin Login Attempt:", email); // Debugging ✅

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      //console.log("❌ Admin not found");
      return res.status(400).json({ message: "Admin not found" });
    }

    // Compare passwords
    //console.log("Stored Password (Hashed):", admin.password); // Debugging ✅
    const isMatch = await bcrypt.compare(password, admin.password);
    //console.log("Password Match:", isMatch); // Debugging ✅

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and send response
    console.log("✅ Admin Authenticated!");
    adminToken(admin, 200, res);
  } catch (error) {
    //console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Logout
router.get("/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.status(200).json({ message: "Admin logged out successfully" });
});

// Protected Admin Dashboard Route
router.get("/admin-dashboard", adminAuth, (req, res) => {
  res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
