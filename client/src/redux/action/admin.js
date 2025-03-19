import axios from "axios";
import { server } from "../../server";
import {
  ADMIN_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_PROFILE_LOAD_SUCCESS,
  ADMIN_PROFILE_UPDATE_SUCCESS,
  ADMIN_PASSWORD_UPDATE_SUCCESS,
} from "./actionTypes";

// 🔹 Helper function to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Admin Login
export const adminLogin = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_LOGIN_REQUEST" });

    // 🔹 Send login request
    const { data } = await axios.post(`${server}/admin/login`, {
      email,
      password,
    });

    if (!data.token) throw new Error("Token not received!");

    // ✅ Store token
    localStorage.setItem("adminToken", data.token);

    // ✅ Dispatch success action
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: { token: data.token } });

    console.log("✅ Login successful:", data);

    // 🔹 Redirect to admin dashboard
    navigate("/admin-dashboard");
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);

    dispatch({
      type: ADMIN_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// ✅ Load Admin Profile
export const loadAdminProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/admin/profile`, {
      headers: getAuthHeaders(),
    });

    dispatch({ type: ADMIN_PROFILE_LOAD_SUCCESS, payload: data.admin });
  } catch (error) {
    dispatch({ type: ADMIN_ERROR, payload: error.response?.data?.message || "Failed to load profile" });
  }
};

// ✅ Update Admin Profile
export const updateAdminProfile = (adminData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${server}/admin/update-profile`, adminData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    dispatch({ type: ADMIN_PROFILE_UPDATE_SUCCESS, payload: data.admin });
  } catch (error) {
    dispatch({ type: ADMIN_ERROR, payload: error.response?.data?.message || "Profile update failed" });
  }
};

// ✅ Update Admin Password
export const updateAdminPassword = (passwordData) => async (dispatch) => {
  try {
    await axios.put(`${server}/admin/update-password`, passwordData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    dispatch({ type: ADMIN_PASSWORD_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: ADMIN_ERROR, payload: error.response?.data?.message || "Password update failed" });
  }
};
