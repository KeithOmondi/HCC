const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

const adminAuth = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      if (requiredRole && admin.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied. Insufficient privileges." });
      }

      req.admin = admin; // Attach admin details to the request object
      next(); // Continue to the next middleware
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = adminAuth;
