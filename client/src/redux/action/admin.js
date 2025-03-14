import axios from "axios";
import { server } from "../../server";

export const adminLogin = (email, password, navigate) => async (dispatch) => {
  const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
  const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";

  try {
    dispatch({ type: "ADMIN_LOGIN_REQUEST" }); // ✅ Set loading state

    const { data } = await axios.post(`${server}/admin/login`, { email, password });

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: { token: data.token } }); // ✅ Fix payload

    localStorage.setItem("adminToken", data.token);

    console.log("✅ Login successful, redirecting to dashboard...", data);
    console.log("message", data)
    navigate("/admin-dashboard"); // ✅ Redirect after login
  } catch (error) {
    dispatch({ 
      type: ADMIN_LOGIN_FAILURE, 
      payload: error.response?.data?.message || "Login failed" 
    });
  }
};

