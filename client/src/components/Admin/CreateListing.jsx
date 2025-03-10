import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createListing, clearErrors } from "../../redux/action/listing";
import { categoriesData } from "../../static/data";

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
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Listing created successfully!");
      navigate("/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [dispatch, error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("propertyId", agent._id);

    dispatch(
      createListing({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        propertyId: agent._id,
        images,
      })
    );
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Listing</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={name}
            className="mt-2 w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your listing name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Description <span className="text-red-500">*</span></label>
          <textarea
            cols="30"
            rows="8"
            required
            value={description}
            className="mt-2 w-full pt-2 px-3 border border-gray-300 rounded-[3px]"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your listing description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">Category <span className="text-red-500">*</span></label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category</option>
            {categoriesData?.map((cat) => (
              <option value={cat.title} key={cat.title}>{cat.title}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Upload Images <span className="text-red-500">*</span></label>
          <input type="file" id="upload" className="hidden" multiple onChange={handleImageChange} />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Listing Preview"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 cursor-pointer w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
