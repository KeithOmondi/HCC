import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.cart.findIndex((i) => i._id === item._id);

      if (existingItemIndex !== -1) {
        // ✅ Correct way: Replace the item without mutating directly
        state.cart[existingItemIndex] = { ...state.cart[existingItemIndex], qty: item.qty };
      } else {
        state.cart = [...state.cart, { ...item, qty: item.qty || 1 }];
      }
    })
    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    });
});
