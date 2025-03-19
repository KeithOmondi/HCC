import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../redux/action/admin";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify"; // ✅ Toast for feedback

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state?.admin || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      dispatch(adminLogin(email, password, navigate)); // ✅ Prevent multiple clicks
    }
  };

  // ✅ Show error toast when login fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, dispatch]); // ✅ Added dispatch for safety

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => setVisible(!visible)}
              aria-label="Toggle password visibility"
              tabIndex="0" // ✅ Makes button keyboard-accessible
            >
              {visible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </button>
          </div>

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
