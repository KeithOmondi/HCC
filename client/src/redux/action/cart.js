// Add to Cart Action
export const addToCart = (data) => (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  // ✅ Ensure Redux updates before saving to localStorage
  setTimeout(() => {
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    console.log("Cart saved to localStorage:", getState().cart.cart); // Debugging log
  }, 100);
};

// Remove from Cart Action
export const removeFromCart = (data) => (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });

  setTimeout(() => {
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    console.log("Cart updated after removal:", getState().cart.cart);
  }, 100);
};
