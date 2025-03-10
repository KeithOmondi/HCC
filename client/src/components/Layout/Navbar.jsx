import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex} space-x-4`}>
      {navItems &&
        navItems.map((item, index) => (
          <div key={index} className="flex">
            <Link
              to={item.url}
              className={`px-6 py-2 font-medium transition duration-300 ease-in-out flex items-center
                ${
                  active === index + 1
                    ? "text-[#17dd1f] border-b-2 border-[#17dd1f]"
                    : "text-black 800px:text-white hover:text-[#17dd1f]"
                }`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
