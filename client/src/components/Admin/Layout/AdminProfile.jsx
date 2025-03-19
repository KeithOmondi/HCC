import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateAdminPassword, updateAdminProfile } from "../../../redux/action/admin";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);

  const [name, setName] = useState(admin?.name || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [avatar, setAvatar] = useState(admin?.avatar?.url || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Handle Avatar Upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Profile Update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAdminProfile({ name, email, avatar }))
      .then(() => toast.success("Profile updated successfully!"))
      .catch((err) => toast.error(err.response.data.message));
  };

  // Handle Password Update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAdminPassword({ password, newPassword }))
      .then(() => toast.success("Password updated successfully!"))
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h2>

      {/* Avatar & Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={avatar || "https://via.placeholder.com/150"}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
      </div>

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>

      {/* Password Update Form */}
      <h3 className="text-xl font-semibold mt-6">Reset Password</h3>
      <form onSubmit={handlePasswordUpdate} className="space-y-4 mt-4">
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
