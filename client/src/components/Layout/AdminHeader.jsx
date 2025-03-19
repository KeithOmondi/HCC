import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const { admin } = useSelector((state) => state?.admin || {}); // ✅ Prevent undefined errors

  const defaultAvatar =
    "https://res.cloudinary.com/drls2cpnu/image/upload/v1742378937/default-avatar.png"; // ✅ Replace with an actual default avatar

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="https://res.cloudinary.com/drls2cpnu/image/upload/v1742378937/haoimg_tttjcs.png"
            alt="Logo"
            className="h-[50px] object-contain" // ✅ Added height to avoid layout shifts
          />
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/coupons" className="800px:block hidden">
            <AiOutlineGift size={30} className="mx-5 cursor-pointer text-gray-700" />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer size={30} className="mx-5 cursor-pointer text-gray-700" />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag size={30} className="mx-5 cursor-pointer text-gray-700" />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage size={30} className="mx-5 cursor-pointer text-gray-700" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail size={30} className="mx-5 cursor-pointer text-gray-700" />
          </Link>
          <Link to="/admin-dashboard/profile">
            <img
              src={admin?.avatar?.url || defaultAvatar} // ✅ Prevents broken image
              alt="Admin Profile"
              className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer border border-gray-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
