const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Listing = require("../model/listing");
const Transaction = require("../model/transaction");
const Property = require("../model/property");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const adminAuth = require("../middleware/adminAuth");
const multer = require("multer");
const mongoose = require("mongoose");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload images to Cloudinary
const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: "listings" },
      (error, uploadedImage) => {
        if (error) return reject(new Error(`Image upload failed: ${error.message}`));
        resolve({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
    );
    stream.end(file.buffer);
  });
};

// Create Listing with Property  
router.post(
  "/create-listing",
  upload.array("images", 5),
  catchAsyncErrors(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { name, description, category, originalPrice, discountPrice, stock, tags, address, phoneNumber, email } = req.body;

      if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("No images uploaded", 400));
      }

      const imagesLinks = await Promise.all(req.files.map(uploadImage));

      const [newProperty] = await Property.create([{ name, description, category, tags, stock, address, phoneNumber, email }], { session });

      const [listing] = await Listing.create(
        [{ name, description, category, originalPrice, discountPrice, stock, tags, images: imagesLinks, propertyId: newProperty._id }],
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      
      res.status(201).json({ success: true, listing, property: newProperty });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete Property Listing
router.delete(
  "/delete-property-listing/:id",
  adminAuth("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return next(new ErrorHandler("Property listing not found", 404));
      }

      const listings = await Listing.find({ propertyId: req.params.id });

      await Promise.all(
        listings.flatMap((listing) =>
          listing.images.map(async (img) => {
            if (img.public_id) await cloudinary.v2.uploader.destroy(img.public_id);
          })
        )
      );

      await Listing.deleteMany({ propertyId: req.params.id });
      await property.deleteOne();

      res.status(200).json({ success: true, message: "Property listing deleted successfully!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Admin Fetch All Listings
router.get(
  "/admin-all-listings",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const listings = await Listing.find().populate({
        path: "propertyId",
        select: "name address",
        options: { strictPopulate: false }, // Prevent errors if property is missing
      });

      if (!listings.length) {
        return next(new ErrorHandler("No listings found", 404));
      }

      res.status(200).json({ success: true, listings });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
