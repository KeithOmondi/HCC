import React, { useEffect, useState, useMemo } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createListing, clearErrors } from "../../redux/action/listing";
import { listingsData } from "../../static/data"; 
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const CreateListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { agent } = useSelector((state) => state.agent);
  const { error, success } = useSelector((state) => state.listings) || {};

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [stock, setStock] = useState(1);

  // Extract unique categories
  const categories = useMemo(() => {
    return [...new Set(listingsData?.map((item) => item.category))];
  }, [listingsData]);

  // Handle API responses
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Listing created successfully!");
      navigate("/");
    }
  }, [dispatch, error, success, navigate]);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = ""; // Reset input
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Remove an image
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image, index) => formData.append(`images[${index}]`, image));
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("propertyId", agent?._id || "");

    dispatch(createListing(formData));
  };

  return (
    <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] bg-white shadow-lg rounded-lg p-4 md:p-6 mx-auto mt-6 max-h-screen overflow-auto">
      <h5 className="text-2xl font-semibold text-center mb-4">Create Listing</h5>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter listing name..."
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter listing description..."
            rows="4"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Choose a category</option>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>

        {/* Price Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Original Price</label>
            <input
              type="number"
              value={originalPrice}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              placeholder="Enter price..."
            />
          </div>
          <div>
            <label className="block text-gray-700">Discount Price</label>
            <input
              type="number"
              value={discountPrice}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              onChange={(e) => setDiscountPrice(Number(e.target.value))}
              placeholder="Enter discount price..."
            />
          </div>
        </div>

        {/* Upload Images */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap mt-2">
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={30} className="text-gray-500" />
            </label>
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="h-24 w-24 object-cover m-2 rounded-md shadow-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
