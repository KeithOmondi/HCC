const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Client = require("../model/client");

module.exports = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("Access Denied, please contact the site admin", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.client = await Client.findById(decoded.id).select("+role"); // Ensure role is included

    if (!req.client) {
        return next(new ErrorHandler("Authentication failed, client not found", 401));
    }

    console.log("Authenticated User:", req.client);
    next();
});
