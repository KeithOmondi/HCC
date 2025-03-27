const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const Admin = require("../model/admin"); // Ensure this points to your Admin model

const adminAuth = () => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔍 Incoming Auth Header:", authHeader || "❌ No Auth Header Found");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ Unauthorized: No token provided");
      return next(new ErrorHandler("Unauthorized: No token provided", 401));
    }

    const token = authHeader.split(" ")[1];
    console.log("🔑 Extracted Token:", token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    if (!decoded) {
      console.error("❌ Unauthorized: Invalid token");
      return next(new ErrorHandler("Unauthorized: Invalid token", 401));
    }

    // Fetch admin from DB
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.error("❌ Admin Not Found for ID:", decoded.id);
      return next(new ErrorHandler("Admin not found", 404));
    }

    console.log("✅ Admin Authenticated:", admin.email);
    req.admin = admin; // Attach admin details to the request
    next();
  } catch (error) {
    console.error("❌ Authentication Failed:", error.message);
    return next(new ErrorHandler("Authentication failed: " + error.message, 401));
  }
};

module.exports = adminAuth;
