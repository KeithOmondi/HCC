const jwt = require("jsonwebtoken");

const agentAuth = (req, res, next) => {
  const token = req.cookies.agentToken; // ✅ Ensure agent-specific token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "agent") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.agent = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = agentAuth;
