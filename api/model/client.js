const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be at least 4 characters long"],
    select: false,
  },
  phoneNumber: {
    type: String,
  },
  addresses: [
    {
      country: String,
      city: String,
      address1: String,
      address2: String,
      zipCode: String,
      addressType: String,
    },
  ],
  role: {
    type: String,
    enum: ["client", "admin"], // Allow only "client" or "admin"
    default: "client",
  },
  avatar: {
    public_id: String,
    url: {
      type: String,
      default: "https://example.com/default-avatar.png", // Default avatar
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// 🔹 Hash password before saving
clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Generate JWT token
clientSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// 🔹 Compare password
clientSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Client", clientSchema);
