import axios from "axios";
import { server } from "../../server";

export const adminLogin = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "AdminLoginRequest" });

    const { data } = await axios.post(`${server}/admin/login`, {
      email,
      password,
    });

    dispatch({ type: "AdminLoginSuccess", payload: data.token });

    localStorage.setItem("adminToken", data.token);
    navigate("/admin/dashboard");
  } catch (error) {
    dispatch({
      type: "AdminLoginFail",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};
