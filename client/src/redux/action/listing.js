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
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE,
  CLEAR_ERRORS,
} from "./actionTypes";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Reusable API request function
const apiRequest = async (dispatch, requestType, successType, failType, apiCall) => {
  try {
    dispatch({ type: requestType });
    const { data } = await apiCall();
    dispatch({ type: successType, payload: data });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
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

    // Refetch listings after creation
    dispatch(fetchListings());
  } catch (error) {
    console.error("Create Listing Error:", error);
  }
};

// Fetch all listings (admin use)
export const fetchListings = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/listing/admin-all-listings`);
    dispatch({
      type: FETCH_LISTINGS_SUCCESS,
      payload: data.listings || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_LISTINGS_FAILURE,
      payload: error.response?.data?.message || "Error fetching listings",
    });
  }
};

// Fetch all public property listings
export const fetchAllPropertyListings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LISTINGS_PROPERTY_REQUEST });
    const { data } = await axios.get(`${server}/listing/all-property-listings`);
    dispatch({
      type: GET_ALL_LISTINGS_PROPERTY_SUCCESS,
      payload: data.propertyListings || [],
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_LISTINGS_PROPERTY_FAIL,
      payload: error.response?.data?.message || "Error fetching property listings",
    });
  }
};

// Delete Listing
export const deleteListing = (listingId) => async (dispatch) => {
  try {
    if (!isValidObjectId(listingId)) {
      throw new Error("Invalid listing ID");
    }

    dispatch({ type: DELETE_LISTING_REQUEST });
    await axios.delete(`${server}/listing/delete-listing/${listingId}`, { withCredentials: true });

    dispatch({ type: DELETE_LISTING_SUCCESS, payload: listingId });
    dispatch(fetchListings());
  } catch (error) {
    dispatch({
      type: DELETE_LISTING_FAIL,
      payload: error.response?.data?.message || "Error deleting listing",
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
