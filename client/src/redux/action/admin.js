import axios from "axios";
import { jwtDecode } from "jwt-decode";

import {
  ADMIN_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_PROFILE_LOAD_SUCCESS,
  ADMIN_PROFILE_UPDATE_SUCCESS,
  ADMIN_PASSWORD_UPDATE_SUCCESS,
  ADMIN_LOGOUT,
} from "./actionTypes";
import { server } from "../../server";

// ✅ Helper function to get token from localStorage & check expiry
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    console.warn("⚠️ No admin token found in localStorage.");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      console.warn("🔴 Token expired, logging out...");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
};

// ✅ Admin Login
export const adminLogin = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_LOGIN_REQUEST" });

    const { data } = await axios.post(`${server}/admin/login`, {
      email,
      password,
    });

    if (!data.token) throw new Error("Token not received!");

    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminId", data.admin.id);

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: { token: data.token } });

    console.log("✅ Admin login successful:", data);
    navigate("/admin-dashboard");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";

    console.error("❌ Login Error:", errorMessage);
    dispatch({ type: ADMIN_LOGIN_FAILURE, payload: errorMessage });
  }
};

// ✅ Load Admin Profile
export const loadAdminProfile = () => async (dispatch) => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Unauthorized: Token expired or missing");

    const { data } = await axios.get(`${server}/admin/profile`, { headers });

    dispatch({ type: ADMIN_PROFILE_LOAD_SUCCESS, payload: data.admin });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to load profile";
    console.error("❌ Profile Load Error:", errorMessage);
    dispatch({ type: ADMIN_ERROR, payload: errorMessage });
  }
};

// ✅ Update Admin Profile
export const updateAdminProfile = (adminData) => async (dispatch) => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Unauthorized: Token expired or missing");

    const { data } = await axios.put(
      `${server}/admin/update-profile`,
      adminData,
      {
        headers: { "Content-Type": "application/json", ...headers },
      }
    );

    dispatch({ type: ADMIN_PROFILE_UPDATE_SUCCESS, payload: data.admin });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Profile update failed";
    console.error("❌ Profile Update Error:", errorMessage);
    dispatch({ type: ADMIN_ERROR, payload: errorMessage });
  }
};

// ✅ Update Admin Password
export const updateAdminPassword = (passwordData) => async (dispatch) => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Unauthorized: Token expired or missing");

    await axios.put(`${server}/admin/update-password`, passwordData, {
      headers: { "Content-Type": "application/json", ...headers },
    });

    dispatch({ type: ADMIN_PASSWORD_UPDATE_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Password update failed";
    console.error("❌ Password Update Error:", errorMessage);
    dispatch({ type: ADMIN_ERROR, payload: errorMessage });
  }
};

// ✅ Admin Logout
export const logoutAdmin = () => (dispatch) => {
  try {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");

    dispatch({ type: ADMIN_LOGOUT });

    console.log("✅ Admin logged out successfully");

    // Redirect manually
    window.location.href = "/admin-login"; // ✅ Alternative fix
  } catch (error) {
    console.error("❌ Logout Error:", error.message);
  }
};
