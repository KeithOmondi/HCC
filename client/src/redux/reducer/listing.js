import { createReducer } from "@reduxjs/toolkit";
import {
  LISTING_CREATE_REQUEST,
  LISTING_CREATE_SUCCESS,
  LISTING_CREATE_FAIL,
  GET_ALL_LISTINGS_PROPERTY_REQUEST,
  GET_ALL_LISTINGS_PROPERTY_SUCCESS,
  GET_ALL_LISTINGS_PROPERTY_FAIL,
  DELETE_LISTING_REQUEST,
  DELETE_LISTING_SUCCESS,
  DELETE_LISTING_FAIL,
  GET_ALL_LISTINGS_REQUEST,
  GET_ALL_LISTINGS_SUCCESS,
  GET_ALL_LISTINGS_FAIL,
  CLEAR_ERRORS,
} from "./actionTypes"; // Ensure correct import path

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
    .addCase(LISTING_CREATE_REQUEST, (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase(LISTING_CREATE_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.listing = action.payload;
      state.success = true;
    })
    .addCase(LISTING_CREATE_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all listings of a property
    .addCase(GET_ALL_LISTINGS_PROPERTY_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_LISTINGS_PROPERTY_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.listings = action.payload;
    })
    .addCase(GET_ALL_LISTINGS_PROPERTY_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete listing
    .addCase(DELETE_LISTING_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(DELETE_LISTING_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(DELETE_LISTING_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all listings
    .addCase(GET_ALL_LISTINGS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_LISTINGS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allListings = action.payload;
    })
    .addCase(GET_ALL_LISTINGS_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});
