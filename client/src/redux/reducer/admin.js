import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGOUT,
} from "./actionTypes"; // Ensure action types are correctly imported

const initialState = {
  adminToken: localStorage.getItem("adminToken") || null,
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
        error: null 
      };

    case ADMIN_LOGIN_FAILURE:
      return { 
        ...state, 
        error: action.payload || "Login failed", 
        loading: false 
      };

    case ADMIN_LOGOUT:
      localStorage.removeItem("adminToken");
      return { 
        ...state, 
        adminToken: null, 
        loading: false, 
        error: null 
      };

    default:
      return state; // Return unchanged state if action type is unknown
  }
};

export default adminReducer;
