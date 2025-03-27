import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGOUT,
  ADMIN_PROFILE_LOAD_SUCCESS,
  ADMIN_PROFILE_UPDATE_SUCCESS,
  ADMIN_PASSWORD_UPDATE_SUCCESS,
} from "./actionTypes"; // Ensure action types are correctly imported

const initialState = {
  adminToken: localStorage.getItem("adminToken") || null,
  adminProfile: null, // Stores admin profile data
  loading: false,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        adminToken: action.payload.token,
        loading: false,
        error: null,
      };

    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        adminToken: null, // Ensure token is cleared if login fails
        loading: false,
        error: action.payload || "Login failed",
      };

    case ADMIN_PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        adminProfile: action.payload,
        loading: false,
      };

    case ADMIN_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        adminProfile: action.payload, // Update profile details
        error: null, // Clear previous errors if any
      };

    case ADMIN_PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        error: null, // Ensure errors are cleared on success
      };

    case ADMIN_LOGOUT:
      // Ensure localStorage is cleared
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      return {
        ...initialState, // Reset state to initial values
      };

    default:
      return state; // Ensure unchanged state for unknown actions
  }
};

export default adminReducer;
