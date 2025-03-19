const jwt = require("jsonwebtoken");

const adminToken = (admin, statusCode, res) => {
  const token = jwt.sign(
    { id: admin._id, role: admin.role },  // Ensure role is included
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(statusCode).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};

module.exports = adminToken;
