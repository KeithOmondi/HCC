import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../redux/action/admin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get admin state from Redux
  const { adminToken, loading, error } = useSelector((state) => state?.admin || {});

  // Debugging Redux State
  // useEffect(() => {
   
  
  //   if (adminToken) {  // ✅ Check Redux state first
  //     //console.log("✅ Redirecting to /admin-dashboard...");
  //     navigate("/admin-dashboard", { replace: true });
  //   }
  // }, [adminToken, navigate]);  // ✅ Depend on adminToken & navigate
  
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password, navigate)); // ✅ Pass navigate
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>} {/* ✅ Display error */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
