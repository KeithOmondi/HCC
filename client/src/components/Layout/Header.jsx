import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaShoppingCart,
  FaPhoneAlt,
  FaTimes,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.jpg";
import styles from "../../styles/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart"

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rentDropdownOpen, setRentDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ openCart, setOpenCart] = useState(false)
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.name || "");
    }
  }, []);

  const handleRentSelection = (path, category) => {
    navigate(`${path}?category=${encodeURIComponent(category)}`);
    setRentDropdownOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUsername("");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const pathToName = {
      "/": "Home",
      "/events": "Events",
      "/rent": "Rent",
      "/services": "Services",
    };

    const matchedPath = Object.keys(pathToName).find((key) =>
      location.pathname.startsWith(key)
    );
    setActiveLink(pathToName[matchedPath] || "");
  }, [location.pathname]);

  return (
    <>
      <div className="bg-gray-50 sticky top-0 z-50 backdrop-blur-lg bg-opacity-60 hidden lg:block">
  <div className="shadow-md sticky top-0 z-50">
    <div className="mx-auto flex justify-between items-center px-6 py-3">
      <img src={Logo} alt="Logo" className="w-10 h-10" />

      {/* Navigation */}
      <nav className="flex items-center gap-6 text-sm">
        <motion.div>
          <Link
            to="/"
            className={`${
              activeLink === "Home"
                ? "border-b-2 border-blue-950 font-bold text-base"
                : "text-blue-950"
            } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
          >
            Home
          </Link>
        </motion.div>

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
                {["Warehouses", "Real Estate", "Event Spaces", "Office Spaces"].map(
                  (category, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleRentSelection("/rent", category)}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    >
                      Rent {category}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        <motion.div>
          <Link
            to="/events"
            className={`${
              activeLink === "Events"
                ? "border-b-2 border-blue-950 font-bold text-base"
                : "text-blue-950"
            } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
          >
            Blogs & Events
          </Link>
        </motion.div>

        <motion.div>
          <Link
            to="/services"
            className={`${
              activeLink === "Services"
                ? "border-b-2 border-blue-950 font-bold text-base"
                : "text-blue-950"
            } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
          >
            Services
          </Link>
        </motion.div>

        {/* Company Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-blue-950 transition hover:border-b-2 border-blue-950 hover:font-bold hover:text-base"
          >
            Company <IoIosArrowDown />
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white text-blue-950 shadow-lg rounded-lg">
              <ul className="py-2">
                {["About Us", "Careers", "Contact"].map((option, idx) => (
                  <li key={idx} className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Right Icons and User Profile */}
      <div className="flex items-center gap-4">
        <button className="flex items-center text-sm gap-1 bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full">
          <FaPlus /> Appointment
        </button>
        <button className="bg-gray-100 hover:bg-blue-950 hover:text-white p-2 rounded-full">
          <FaSearch />
        </button>
        
        <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="black"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

        <button className="flex items-center text-sm gap-2 bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full">
          <FaPhoneAlt /> +123-456-7890
        </button>

        {/* User Dropdown */}
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
                <ul className="py-2">
                  <Link to="/profile" className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                    Profile
                  </Link>
                  <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Settings</li>
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
        <motion.button
          className="px-4 py-2 bg-gray-500 text-sm text-white hover:bg-blue-950 rounded-lg"
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </div>
    </div>
  </div>
</div>
{openCart ? <Cart setOpenCart={setOpenCart} /> : null}


      {/*mobile navbar*/}
      <div className="bg-gray-50 lg:hidden sticky top-0 z-50 backdrop-blur-lg bg-opacity-60 shadow-md">
        <div className="flex justify-between items-center px-4 py-3 relative">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-950 text-2xl"
          >
            <FaBars />
          </button>

          {/* Logo at the center */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src={Logo} alt="Logo" className="w-12 h-12" />
          </Link>

          {/* Cart Icon */}
          <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="black"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
        </div>
        {openCart ? <Cart setOpenCart={setOpenCart} /> : null}



        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-md z-40 transition-all">
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
                  className="flex justify-between items-center w-full text-blue-950 hover:text-blue-700"
                >
                  Rent <FaChevronDown className="ml-2" />
                </button>
                {rentDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/rent"
                      className="block text-sm text-blue-950 hover:text-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Warehouses
                    </Link>
                    <Link
                      to="/rent/real-estate"
                      className="block text-sm text-blue-950 hover:text-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Real Estate
                    </Link>
                    <Link
                      to="/rent/event-spaces"
                      className="block text-sm text-blue-950 hover:text-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Event Spaces
                    </Link>
                    <Link
                      to="/rent/office-spaces"
                      className="block text-sm text-blue-950 hover:text-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Office Spaces
                    </Link>
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
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/about"
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
                  </div>
                  
                )}
              </div>
             
            </ul>
          </div>
        )}
      </div>
      
    </>
  );
};

export default Header;
