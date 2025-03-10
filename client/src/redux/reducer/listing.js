import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  listing: null,
  listings: [],
  allListings: [],
  message: null,
  error: null,
  success: false,
};

export const listingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("listingCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("listingCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.listing = action.payload;
      state.success = true;
    })
    .addCase("listingCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all listings of a property
    .addCase("getAllListingsPropertyRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllListingsPropertySuccess", (state, action) => {
      state.isLoading = false;
      state.listings = action.payload;
    })
    .addCase("getAllListingsPropertyFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete listing
    .addCase("deleteListingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteListingSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteListingFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all listings
    .addCase("getAllListingsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllListingsSuccess", (state, action) => {
      state.isLoading = false;
      state.allListings = action.payload;
    })
    .addCase("getAllListingsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
