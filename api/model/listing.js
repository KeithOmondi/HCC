const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter your listing name!"] },
  description: {
    type: String,
    required: [true, "Please enter your listing description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your listing category!"],
  },
  tags: [{ type: String }],
  originalPrice: { type: Number },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your listing price!"],
  },
  stock: { type: Number, required: [true, "Please enter your listing stock!"] },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  ratings: { type: Number, default: 0 },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  sold_out: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Listing", listingSchema);
