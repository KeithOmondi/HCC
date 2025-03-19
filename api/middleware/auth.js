const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Client = require("../model/client");
const Property = require("../model/property");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Support Authorization Header

    if (!token) {
        return next(new ErrorHandler("Access Denied, please contact the site admin", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.client = await Client.findById(decoded.id);

    if (!req.client) {
        return next(new ErrorHandler("Authentication failed, client not found", 401));
    }

    console.log("Authenticated User:", req.client);

    next();
});



exports.isAgent = catchAsyncErrors(async(req,res,next) => {
    const {agent_token} = req.cookies;
    if(!agent_token){
        return next(new ErrorHandler("Access Denied, please contact the site admin", 401));
    }

    const decoded = jwt.verify(agent_token, process.env.JWT_SECRET_KEY);

    req.agent = await Property.findById(decoded.id);

    next();
});


exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        console.log("Checking Admin Role:", req.client?.role, req.agent?.role);

        const userRole = req.client?.role || req.agent?.role; // Check both client and agent roles

        if (!userRole || !roles.includes(userRole)) {
            return next(new ErrorHandler("Access Denied, please contact the site admin", 403));
        }

        next();
    };
};




