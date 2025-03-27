const jwt = require("jsonwebtoken");

const adminToken = (admin, statusCode, res) => {
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing from environment variables!");
    return res.status(500).json({ success: false, message: "Server error" });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Default: 1 hour
  );

  // Set HTTP-only cookie
  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict",
    path: "/",  // Explicitly define path for consistency
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  // Return response (Optionally remove `token` from JSON if using only cookies)
  res.status(statusCode).json({
    success: true,
    ...(process.env.SEND_TOKEN === "true" && { token }), // Optional: Remove token in response
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};

module.exports = adminToken;
