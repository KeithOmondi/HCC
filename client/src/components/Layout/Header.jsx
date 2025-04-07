import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaSearch, FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Logo from "../../assets/logo.jpg";
import styles from "../../styles/styles";
import { server } from "../../server";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rentDropdownOpen, setRentDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [username, setUsername] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const storedClient = sessionStorage.getItem("client");
  
    if (storedClient && storedClient !== "undefined") {
      try {
        const parsedClient = JSON.parse(storedClient);
        setUsername(parsedClient?.name || "");
      } catch (error) {
        console.error("Error parsing client data:", error);
      }
    } else {
      console.warn("No valid client data found in sessionStorage.");
    }
  }, []);
  
  

  const handleRentSelection = (path, category) => {
    navigate(`${path}?category=${encodeURIComponent(category)}`);
    setRentDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${server}/client/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("client");
        setUsername("");
        toast.success("Logged out successfully!");
        navigate("/");
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred!");
    }
  };

  useEffect(() => {
    const pathToName = {
      "/": "Home",
      "/events": "Events",
      "/rent": "Rent",
      "/services": "Services",
      "/aboutus": "Company",
      "/careers": "Company",
      "/contact": "Company",
      "/agent-login": "Agent",
      "/profile": "Profile",
      "/settings": "Settings",
    };

    let matchedPath = Object.keys(pathToName).find(
      (key) => location.pathname === key
    );

    if (!matchedPath) {
      matchedPath = Object.keys(pathToName).find((key) =>
        location.pathname.startsWith(key)
      );
    }

    setActiveLink(pathToName[matchedPath] || "");
  }, [location.pathname]);

  return (
    <>
      <div className="bg-gray-50 sticky top-0 z-50 backdrop-blur-lg bg-opacity-60 hidden lg:block">
        <div className="shadow-md sticky top-0 z-50">
          <div className="mx-auto flex justify-between items-center px-6 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/drls2cpnu/image/upload/v1742378937/haoimg_tttjcs.png"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-lg font-semibold text-blue-950">
                HAOCHAPCHAP
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6 text-sm">
              {["Home", "Events", "Services"].map((item, idx) => (
                <motion.div key={idx}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={`${
                      activeLink === item
                        ? "border-b-2 border-blue-950 text-blue-950 font-bold text-base"
                        : "text-blue-950"
                    } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              {/* Rent Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setRentDropdownOpen(!rentDropdownOpen)}
                  className={`flex items-center gap-1 transition ${
                    activeLink === "Rent"
                      ? "border-b-2 border-blue-950 font-bold text-base"
                      : "text-blue-950"
                  } hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                >
                  Rent <IoIosArrowDown />
                </button>
                {rentDropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white text-blue-950 shadow-lg rounded-lg">
                    <ul className="py-2">
                      {[
                        "Warehouses",
                        "Units",
                        "Event Spaces",
                        "Office Spaces",
                      ].map((category, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleRentSelection("/rent", category)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        >
                          Rent {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 transition ${
                    activeLink === "Company"
                      ? "border-b-2 border-blue-950 font-bold text-base"
                      : "text-blue-950"
                  } hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                >
                  Company <IoIosArrowDown />
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white text-blue-950 shadow-lg rounded-lg">
                    <ul className="py-2">
                      {["About Us", "Careers", "Contact"].map((page, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        >
                          <Link to={`/${page.toLowerCase().replace(" ", "")}`}>
                            {page}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Icons & User Profile */}
            <div className="flex items-center gap-4">
              <button className="bg-gray-100 hover:bg-blue-950 hover:text-white p-2 rounded-full">
                <FaSearch />
              </button>

              <div
                className="relative cursor-pointer"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="black" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>

              <Link
                to="/agent-login"
                className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700"
              >
                Become an Agent
              </Link>

              {username ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full"
                  >
                    {username} <IoIosArrowDown />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute mt-2 w-40 bg-gray-100 shadow-lg rounded-lg">
                      <ul className="py-2 flex flex-col">
                        {["Profile", "Settings"].map((item, idx) => (
                          <Link
                            key={idx}
                            to={`/${item.toLowerCase()}`}
                            className={`${
                              activeLink === item
                                ? "border-b-2 border-blue-950 px-4 py-2 text-blue-950 font-bold text-base"
                                : "text-blue-950"
                            } transition hover:border-b-2 px-4 py-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                          >
                            {item}
                          </Link>
                        ))}
                        <li
                          className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-950 text-white rounded-full text-sm hover:bg-blue-800"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {openCart && <Cart setOpenCart={setOpenCart} />}

      {/* Mobile Navigation Menu */}
      <div className="lg:hidden sticky top-0 z-50 backdrop-blur-lg bg-[#0000435] bg-opacity-90 shadow-md">
        <div className="flex justify-between items-center px-4 py-3 relative">
          {/* Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-950 text-2xl z-50"
          >
            {menuOpen ? null : <FaBars />}
          </button>

          {/* Logo at the center */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="https://res.cloudinary.com/drls2cpnu/image/upload/v1742378937/haoimg_tttjcs.png"
              alt="Logo"
              className="w-28 h-10 border-2"
            />
          </Link>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={30} color="black" />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
              {cart && cart.length}
            </span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 h-screen w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button inside Sidebar */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-blue-950 text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          <ul className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              className="text-blue-950 hover:text-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            {/* Rent Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRentDropdownOpen(!rentDropdownOpen)}
                className={`${
                  activeLink === "Rent"
                    ? "border-b-2 border-blue-950 flex items-center gap-1 font-bold text-base"
                    : "text-blue-950"
                } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base flex items-center gap-1`}
              >
                Rent <IoIosArrowDown />
              </button>
              {rentDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white text-blue-950 shadow-lg rounded-lg">
                  <ul className="py-2">
                    {[
                      "Warehouses",
                      "Units",
                      "Event Spaces",
                      "Office Spaces",
                    ].map((category, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleRentSelection("/rent", category)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        Rent {category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              to="/events"
              className="text-blue-950 hover:text-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              Blogs & Events
            </Link>
            <Link
              to="/services"
              className="text-blue-950 hover:text-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex justify-between items-center w-full text-blue-950 hover:text-blue-700"
              >
                Company <FaChevronDown className="ml-2" />
              </button>
              {userDropdownOpen && (
                <ul className="ml-4 mt-2 space-y-2">
                  <Link
                    to="/aboutUs"
                    className="block text-sm text-blue-950 hover:text-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/careers"
                    className="block text-sm text-blue-950 hover:text-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Careers
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-sm text-blue-950 hover:text-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </ul>
              )}
            </div>
          </ul>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default Header;
