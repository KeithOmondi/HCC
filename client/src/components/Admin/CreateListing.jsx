import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createListing, clearErrors } from "../../redux/action/listing";
import { listingsData } from "../../static/data";

const CreateListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.listings) || {};

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: 1,
    address: "",
    phoneNumber: "",
    email: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (Array.isArray(listingsData) && listingsData.length > 0) {
      const uniqueCategories = [...new Set(listingsData.map((item) => item.category))];
      setCategories(uniqueCategories);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Listing created successfully!");
      setTimeout(() => navigate("/listings"), 1500); // Redirect instead of reload
    }
  }, [dispatch, error, success, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["name", "description", "category", "address", "phoneNumber", "email"];
    const hasEmpty = requiredFields.some((field) => !formData[field]);

    if (hasEmpty) return toast.error("Please fill all required fields.");
    if (formData.images.length === 0) return toast.error("Please upload at least one image.");

    const formPayload = new FormData();
    formData.images.forEach((image) => {
      if (image instanceof File) formPayload.append("images", image);
    });

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") formPayload.append(key, value);
    });

    dispatch(createListing(formPayload));

    setFormData({
      name: "",
      description: "",
      category: "",
      tags: "",
      originalPrice: "",
      discountPrice: "",
      stock: 1,
      address: "",
      phoneNumber: "",
      email: "",
      images: [],
    });

    setPreviewImages([]);
  };

  return (
    <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] bg-white shadow-lg rounded-lg p-4 md:p-6 mx-auto mt-6 max-h-screen overflow-auto">
      <h5 className="text-2xl font-semibold text-center mb-4">Create Listing</h5>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Name", name: "name", type: "text", placeholder: "Enter listing name" },
          { label: "Description", name: "description", type: "textarea", placeholder: "Enter listing description" },
          { label: "Address", name: "address", type: "text", placeholder: "Enter address" },
          { label: "Phone Number", name: "phoneNumber", type: "text", placeholder: "Enter phone number" },
          { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                onChange={handleChange}
                rows="4"
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            className="w-full mt-2 border h-[35px] rounded-md"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Choose a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {[
            { label: "Original Price", name: "originalPrice", placeholder: "Enter original price" },
            { label: "Discount Price", name: "discountPrice", placeholder: "Enter discount price" },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Images</label>
          <input type="file" id="upload" className="hidden" multiple onChange={handleImageChange} />
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
