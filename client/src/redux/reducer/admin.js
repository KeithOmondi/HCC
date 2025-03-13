const initialState = {
    adminToken: localStorage.getItem("adminToken") || null,
    loading: false,
    error: null,
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADMIN_LOGIN_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "ADMIN_LOGIN_SUCCESS":
        localStorage.setItem("adminToken", action.payload.token); // ✅ Store in localStorage
        return { ...state, adminToken: action.payload.token, loading: false };
  
      case "ADMIN_LOGIN_FAILURE":
        return { ...state, error: action.payload, loading: false };
  
      case "ADMIN_LOGOUT":
        localStorage.removeItem("adminToken");
        return { ...state, adminToken: null };
  
      default:
        return state;
    }
  };
  
  export default adminReducer;
  