import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createListing, clearErrors } from "../../redux/action/listing";
import { listingsData } from "../../static/data"; // Ensure correct import

const CreateListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.listings) || {};

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [address, setAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [categories, setCategories] = useState([]);
  // Fetch categories from listingsData
  useEffect(() => {
    if (Array.isArray(listingsData) && listingsData.length > 0) {
      const uniqueCategories = [
        ...new Set(listingsData.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, []);

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
    e.target.value = ""; // Reset input to allow re-selection

    const newImages = [];
    const newPreviewImages = [];

    files.forEach((file) => {
      newImages.push(file);
      newPreviewImages.push(URL.createObjectURL(file));
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
    setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviewImages]);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      return toast.error("Please upload at least one image.");
    }



    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tags));
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email)

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
        <div className="mb-4">
          <label className="block text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Choose a category</option>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
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
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Preview"
                className="h-24 w-24 object-cover m-2 rounded-md shadow-md"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address..."
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
          />
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
