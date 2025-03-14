import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
//import toast from "react-hot-toast";

import Header from "./Header";

const Profile = () => {
    const storedUser = sessionStorage.getItem("client");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(user?.avatar?.url || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Profile updated successfully!");
        // API call to update user profile can be added here
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                axios.put(`/user/update-avatar`, { avatar: reader.result }, { withCredentials: true })
                    .then(() => toast.success("Avatar updated successfully!"))
                    .catch((error) => toast.error(error.response.data.message));
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Header />
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Profile Settings</h2>
                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                        <img src={avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-green-500 object-cover" />
                        <label htmlFor="image" className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer shadow">
                            <AiOutlineCamera size={20} />
                            <input type="file" id="image" className="hidden" onChange={handleImage} />
                        </label>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-lg" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" disabled />
                    <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-3 border rounded-lg" />
                    <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" />
                    <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">Update Profile</button>
                </form>
            </div>
        </>
    );
};

export default Profile;