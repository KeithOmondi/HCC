import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaWarehouse,
  FaBuilding,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action/cart";
import { toast } from "react-toastify";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const categories = [
  { name: "All", icon: null },
  { name: "Warehouses", icon: FaWarehouse },
  { name: "Real Estate", icon: FaHome },
  { name: "Event Spaces", icon: FaBuilding },
  { name: "Office Spaces", icon: FaBuilding },
];

const listings = [
  {
    _id: 1,
    category: "Warehouses",
    name: "Large Storage Unit",
    price: "KES 50,000",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/10/ZH/OT/OG/75867042/warehouse-for-long-lease-in-thane-500x500.jpeg",
  },
  {
    _id: 2,
    category: "Real Estate",
    name: "3 Bedroom Apartment",
    price: "KES 80,000",
    image: "https://thumbs.dreamstime.com/b/apartment-building-19532951.jpg",
  },
  {
    _id: 3,
    category: "Event Spaces",
    name: "Wedding Hall",
    price: "KES 100,000",
    image:
      "https://media.istockphoto.com/id/486993238/photo/interior-of-a-wedding-tent-decoration-ready-for-guests.jpg?s=612x612&w=0&k=20&c=Rco782IaCKFSr409we4GPy01-vc4taHweUuuFJJbegk=",
  },
  {
    _id: 4,
    category: "Office Spaces",
    name: "Private Office",
    price: "KES 60,000",
    image:
      "https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg",
  },
  {
    _id: 5,
    category: "Real Estate",
    name: "Luxury Villa",
    price: "KES 250,000",
    image:
      "https://plus.unsplash.com/premium_photo-1682377521753-58d1fd9fa5ce?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D",
  },
  {
    _id: 6,
    category: "Warehouses",
    name: "Industrial Storage",
    price: "KES 120,000",
    image:
      "https://villacarekenya.com/wp-content/uploads/2021/12/5whatsappimage2019-06-12at3.35.59pm.jpeg",
  },
];

export default function RentingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredListings, setFilteredListings] = useState(listings);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? listings
        : listings.filter((item) => item.category === selectedCategory);
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
    <>
      <Header />
      <div className="p-6 bg-gray-100 text-gray-900 min-h-screen">
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-center mb-6"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -10 }}
        >
          Rent Your Ideal Space
        </motion.h1>

        {/* Category Filter */}
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`px-3 py-2 text-sm md:text-base rounded flex items-center gap-2 ${
                selectedCategory === name
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
                <h2 className="text-lg sm:text-xl font-bold">{listing.name}</h2>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
