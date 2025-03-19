import { useState } from "react";
import { useSelector } from "react-redux";
import { FaWarehouse, FaBuilding, FaChair, FaBriefcase } from "react-icons/fa";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const RentingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { listings = [] } = useSelector((state) => state.listing || {});  

  const filteredListings =
    selectedCategory === "All"
      ? listings
      : listings.filter((item) => item.category === selectedCategory);

  const categories = [
    { name: "All", icon: null },
    { name: "Warehouses", icon: <FaWarehouse /> },
    { name: "Units", icon: <FaBuilding /> },
    { name: "Event Spaces", icon: <FaChair /> },
    { name: "Office Spaces", icon: <FaBriefcase /> },
  ];

  return (
    <>
      <Header />

      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Available Rentals</h2>

        {/* Category Selection - Scrollable on Small Screens */}
        <div className="flex overflow-x-auto space-x-3 sm:justify-center mb-4 sm:mb-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition duration-300 flex items-center space-x-2
                ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
            >
              {category.icon} <span className="text-sm sm:text-base">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white shadow-md rounded-lg p-3 sm:p-4">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-md mb-2 sm:mb-4"
                />
                <h3 className="text-sm sm:text-lg font-semibold">{listing.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Category: {listing.category}</p>
                <p className="text-gray-800 font-bold text-sm sm:text-base">Price: {listing.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No listings available in this category.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RentingPage;
