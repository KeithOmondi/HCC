import { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { Link } from "react-router-dom";

const AgentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${server}/property/login-property`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Login successful!");
      // Store token in localStorage or context
      localStorage.setItem("agentToken", data.token);
      // Redirect to dashboard or another page
      window.location.href = "/agent-dashboard";
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Agent Login</h2>
        {message && <p className="text-center text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div>
          <h1 className="justify-between">Don't have an account? <Link to="/agent-signup">Signup</Link> </h1>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;
