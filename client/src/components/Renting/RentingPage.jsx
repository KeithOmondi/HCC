import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaHome,
  FaWarehouse,
  FaBuilding,
  FaShoppingCart,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action/cart";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import styles from "../../styles/styles";
import { ListingsData } from "../../static/data";
import { toast, ToastContainer } from "react-toastify";

const categories = [
  { name: "All", icon: null },
  { name: "Warehouses", icon: FaWarehouse },
  { name: "Units", icon: FaHome },
  { name: "Event Spaces", icon: FaBuilding },
  { name: "Office Spaces", icon: FaBuilding },
];


const RentingPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredListings, setFilteredListings] = useState(ListingsData);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? ListingsData
        : ListingsData.filter((item) => item.category === selectedCategory);
    setFilteredListings(filtered);
  }, [selectedCategory]);

  const handleRentClick = (listing) => {
    toast.success(`You selected: ${listing.name}`);
  };

  const addToCartHandler = (listing) => {
    const isItemExists = cart?.some((item) => item._id === listing._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      dispatch(addToCart({ ...listing, qty: 1 }));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className={`${styles.section} justify-center center`}>
        <div className={`${styles.heading}`}>
          <h1>Rent Your Ideal Space</h1>
        </div>

        {/* Category Filter */}
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`px-3 py-2 text-sm md:text-base rounded flex items-center gap-2 ${selectedCategory === name
                ? "bg-blue-950 text-white"
                : "bg-gray-200"
                }`}
            >
              {Icon && <Icon />} {name}
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
          {filteredListings && filteredListings.length !== 0 && (
            <>
              {filteredListings.map((listing) => (
                <motion.div
                  key={listing._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg sm:text-xl font-bold">
                      {listing.name}
                    </h2>
                    <p className="text-md sm:text-lg text-blue-700 font-semibold">
                      {listing.price}
                    </p>

                    <button
                      className="mt-4 w-full cursor-pointer bg-blue-950 text-white flex items-center justify-center py-2 rounded hover:bg-blue-700"
                      onClick={() => handleRentClick(listing)}
                    >
                      <FaShoppingCart className="mr-2" /> Rent Now
                    </button>

                    <button
                      className="mt-2 w-full cursor-pointer bg-green-600 text-white flex items-center justify-center py-2 rounded hover:bg-green-500"
                      onClick={() => addToCartHandler(listing)}
                    >
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RentingPage;
