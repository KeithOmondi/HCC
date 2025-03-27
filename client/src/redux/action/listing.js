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
  FETCH_LISTINGS_FAILURE,
  FETCH_LISTINGS_SUCCESS,
} from "./actionTypes";

// Utility function to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Reusable API Request Handler
const apiRequest = async (
  dispatch,
  requestType,
  successType,
  failType,
  apiCall
) => {
  try {
    dispatch({ type: requestType });
    const { data } = await apiCall();
    dispatch({ type: successType, payload: data });
    return data; // Return data for further use if needed
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    console.error(`Error in ${requestType}:`, errorMessage);
    dispatch({ type: failType, payload: errorMessage });
    throw error;
  }
};

// Create Listing
export const createListing = (listingData) => async (dispatch) => {
  try {
    await apiRequest(
      dispatch,
      LISTING_CREATE_REQUEST,
      LISTING_CREATE_SUCCESS,
      LISTING_CREATE_FAIL,
      () => axios.post(`${server}/listing/create-listing`, listingData, { withCredentials: true })
    );

    // Fetch updated listings after creation
    dispatch(fetchListings());
  } catch (error) {
    console.error("Error creating listing:", error);
  }
};


// Get All Listings of a Property
export const getAllListingsProperty = (id) => async (dispatch) => {
  if (!isValidObjectId(id)) {
    return dispatch({ type: GET_ALL_LISTINGS_PROPERTY_FAIL, payload: "Invalid property ID format" });
  }

  return await apiRequest(
    dispatch,
    GET_ALL_LISTINGS_PROPERTY_REQUEST,
    GET_ALL_LISTINGS_PROPERTY_SUCCESS,
    GET_ALL_LISTINGS_PROPERTY_FAIL,
    () => axios.get(`${server}/listing/get-all-listings-property/${id}`, { withCredentials: true })
  );
};

// Delete Listing
export const deleteListing = (id) => async (dispatch) => {
  if (!isValidObjectId(id)) {
    return dispatch({ type: DELETE_LISTING_FAIL, payload: "Invalid listing ID format" });
  }

  return await apiRequest(
    dispatch,
    DELETE_LISTING_REQUEST,
    DELETE_LISTING_SUCCESS,
    DELETE_LISTING_FAIL,
    () => axios.delete(`${server}/listing/delete-property-listing/${id}`, { withCredentials: true })
  );
};

/// ✅ Fetch All Listings (Admin Only)
export const getAllListings = () => async (dispatch) => {
  dispatch({ type: GET_ALL_LISTINGS_REQUEST });

  try {
    // 📌 Retrieve Admin Token
    const token = localStorage.getItem("adminToken");
    console.log("🔍 Retrieved Admin Token:", token || "❌ No Token Found");

    if (!token) {
      console.error("❌ No admin token found. Access denied.");
      dispatch({
        type: GET_ALL_LISTINGS_FAIL,
        payload: "Admin authentication required",
      });
      return;
    }

    // 📡 Send API Request
    const apiUrl = `${server}/listing/get-all-listings`;
    console.log("📡 Sending request to:", apiUrl);

    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("✅ API Response:", response.data);

    // ✅ Dispatch Success
    dispatch({
      type: GET_ALL_LISTINGS_SUCCESS,
      payload: response.data.listings || [],
    });
  } catch (error) {
    console.error("❌ Error in getAllListings:", error.response?.data || error.message);
    console.log("🔴 Full Error Object:", error);

    dispatch({
      type: GET_ALL_LISTINGS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch listings",
    });
  }
};


//fetch listings
export const fetchListings = () => async (dispatch) => {
  try {
    const response = await axios.get(`${server}/listing/admin-all-listings`); // Correct endpoint
    dispatch({
      type: FETCH_LISTINGS_SUCCESS,
      payload: response.data.listings, // Ensure it matches the API response structure
    });
  } catch (error) {
    dispatch({
      type: FETCH_LISTINGS_FAILURE,
      payload: error.response?.data?.message || "Error fetching listings",
    });
  }
};




// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
