import axios from "axios";
import { server } from "../../server";

export const adminLogin = (email, password, navigate) => async (dispatch) => {
  const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
  const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";

  try {
    dispatch({ type: "ADMIN_LOGIN_REQUEST" }); // ✅ Start loading

    // Send login request
    const { data } = await axios.post(`${server}/admin/login`, {
      email,
      password,
    });

    if (!data.token) throw new Error("Token not received!"); // ✅ Ensure token is received

    // Dispatch success action
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: { token: data.token } });

    // Store token in localStorage
    localStorage.setItem("adminToken", data.token);

    console.log("✅ Login successful:", data);
    navigate("/admin-dashboard"); // ✅ Redirect to admin dashboard
  } catch (error) {
    //console.error("❌ Login Error:", error.response?.data || error.message);

    dispatch({
      type: ADMIN_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};
