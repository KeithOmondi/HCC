import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaPlus, FaSearch, FaShoppingCart, FaPhoneAlt, FaBars, FaChevronDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Logo from "../../assets/logo.jpg";
import styles from "../../styles/styles";

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
      "/aboutus": "Company",
      "/careers": "Company",
      "/contact": "Company",
    };

    let matchedPath = Object.keys(pathToName).find((key) => location.pathname === key);

    if (!matchedPath) {
      matchedPath = Object.keys(pathToName).find((key) => location.pathname.startsWith(key));
    }

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
                  className={`${activeLink === "Home"
                    ? "border-b-2 border-blue-950 text-blue-950 font-bold text-base"
                    : "text-blue-950"
                    } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                >
                  Home
                </Link>
              </motion.div>

              {/* Rent Dropdown */}
              {/* Rent Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setRentDropdownOpen(!rentDropdownOpen)}
                  className={`${activeLink === "Rent"
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

              <motion.div>
                <Link
                  to="/events"
                  className={`${activeLink === "Events"
                    ? "border-b-2 border-blue-950 text-blue-950 font-bold text-base"
                    : "text-blue-950"
                    } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                >
                  Blogs & Events
                </Link>
              </motion.div>

              <motion.div>
                <Link
                  to="/services"
                  className={`${activeLink === "Services" ? "border-b-2 border-blue-950 text-blue-950 font-bold text-base" : "text-blue-950"}
                  transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                >
                  Services
                </Link>
              </motion.div>

              {/* Company Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`${activeLink === "Company"
                    ? "border-b-2 border-blue-950 flex items-center gap-1 font-bold text-base"
                    : "text-blue-950"
                    } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base flex items-center gap-1`}
                >

                  Company <IoIosArrowDown />
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white text-blue-950 shadow-lg rounded-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                        <Link to="/aboutus">About Us</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                        <Link to="/careers">Careers</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Icons and User Profile */}
            <div className="flex items-center gap-4">
              {/* <button className="flex items-center text-sm gap-1 bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full">
                <FaPlus /> Appointment
              </button> */}
              <button className="bg-gray-100 hover:bg-blue-950 hover:text-white p-2 rounded-full">
                <FaSearch />
              </button>

              <div className={`${styles.normalFlex}`}>
                <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenCart(true)}>
                  <AiOutlineShoppingCart size={30} color="black" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                    {cart && cart.length}
                  </span>
                </div>
              </div>

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
                        <Link to="/profile" className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Profile</Link>
                        <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer" onClick={handleLogout}>
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-4 py-2 bg-blue-950 text-white rounded-full text-sm hover:bg-blue-800">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {openCart && <Cart setOpenCart={setOpenCart} />}
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
                  {["Warehouses", "Units", "Event Spaces", "Office Spaces"].map((category, idx) => (
                    <button
                      key={idx}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50"
                      onClick={() => {
                        handleRentSelection("/rent", category);
                        setMenuOpen(false);
                      }}
                    >
                      Rent {category}
                    </button>
                  ))}
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
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex justify-between items-center w-full text-blue-950 hover:text-blue-700"
              >
                Company <FaChevronDown className="ml-2" />
              </button>
              {dropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    { name: "About Us", path: "/aboutus" },
                    { name: "Careers", path: "/careers" },
                    { name: "Contact", path: "/contact" },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className="block w-full px-4 py-2 hover:bg-blue-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {username ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex justify-between items-center w-full text-blue-950 hover:text-blue-700"
                >
                  {username} <FaChevronDown className="ml-2" />
                </button>
                {userDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-2 hover:bg-blue-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-blue-950 hover:text-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </>
  );
};



export default Header;
