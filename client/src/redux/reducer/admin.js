const initialState = {
  adminToken: localStorage.getItem("adminToken") || null,
  loading: false,
  error: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AdminLoginRequest":
      return { ...state, loading: true, error: null };

    case "AdminLoginSuccess":
      return {
        ...state,
        loading: false,
        adminToken: action.payload,
        error: null,
      };

    case "AdminLoginFail":
      return { ...state, loading: false, error: action.payload };

    case "AdminLogout":
      return { ...state, adminToken: null };

    default:
      return state;
  }
};
