const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.error("🚨 No token found in request headers!");
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Decoded Token:", decoded);

    // Check if role exists in token
    if (!decoded.role) {
      console.error("🚨 Token missing role:", decoded);
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Check if role is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    // Attach admin to request
    req.admin = await Admin.findById(decoded.id).select("-password");

    if (!req.admin) {
      console.error("❌ Admin not found for ID:", decoded.id);
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log("✅ Authenticated Admin:", req.admin);
    next();
  } catch (error) {
    console.error("❌ Admin Auth Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminAuth;
