import axios from "axios";
import { server } from "../../server";
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
} from "./actionTypes";

// Utility function to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Common Axios Configuration
const axiosConfig = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// Create Listing
export const createListing = (listingData) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_CREATE_REQUEST });

    console.log("📤 Sending listingData:", listingData);

    const { data } = await axios.post(
      `${server}/listing/create-listing`,
      listingData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log("✅ Response received:", data);

    dispatch({
      type: LISTING_CREATE_SUCCESS,
      payload: data?.listing || {},
    });
  } catch (error) {
    console.error("❌ Error in createListing:", error.response?.data || error.message);
    dispatch({
      type: LISTING_CREATE_FAIL,
      payload: error.response?.data?.message || error.message || "Failed to create listing",
    });
  }
};

// Get All Listings of a Property
export const getAllListingsProperty = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LISTINGS_PROPERTY_REQUEST });

    if (!isValidObjectId(id)) {
      throw new Error("Invalid property ID format");
    }

    console.log(`📤 Fetching all listings for property ID: ${id}`);

    const { data } = await axios.get(
      `${server}/listing/get-all-listings-property/${id}`,
      { withCredentials: true }
    );

    console.log("✅ Listings fetched successfully:", data);

    dispatch({
      type: GET_ALL_LISTINGS_PROPERTY_SUCCESS,
      payload: data?.listings || [],
    });
  } catch (error) {
    console.error("❌ Error fetching property listings:", error.response?.data || error.message);
    dispatch({
      type: GET_ALL_LISTINGS_PROPERTY_FAIL,
      payload: error.response?.data?.message || "Failed to fetch listings",
    });
  }
};

// Delete Listing
export const deleteListing = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LISTING_REQUEST });

    if (!isValidObjectId(id)) {
      throw new Error("Invalid listing ID format");
    }

    console.log(`🗑️ Deleting listing with ID: ${id}`);

    const { data } = await axios.delete(
      `${server}/listing/delete-property-listing/${id}`,
      { withCredentials: true }
    );

    console.log("✅ Listing deleted:", data);

    dispatch({
      type: DELETE_LISTING_SUCCESS,
      payload: data?.message || "Listing deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting listing:", error.response?.data || error.message);
    dispatch({
      type: DELETE_LISTING_FAIL,
      payload: error.response?.data?.message || "Failed to delete listing",
    });
  }
};

// Get All Listings
export const getAllListings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LISTINGS_REQUEST });

    console.log("📤 Fetching all listings...");

    const { data } = await axios.get(`${server}/listing/get-all-listings`, {
      withCredentials: true,
    });

    console.log("✅ All listings fetched:", data);

    dispatch({
      type: GET_ALL_LISTINGS_SUCCESS,
      payload: data?.listings || [],
    });
  } catch (error) {
    console.error("❌ Error fetching all listings:", error.response?.data || error.message);
    dispatch({
      type: GET_ALL_LISTINGS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch all listings",
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  console.log("🧹 Clearing errors...");
  dispatch({ type: CLEAR_ERRORS });
};
