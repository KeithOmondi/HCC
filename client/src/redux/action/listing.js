import axios from "axios";
import { server } from "../../server";

// Create Listing
export const createListing =
  (listingData) =>
  async (dispatch) => {
    try {
      dispatch({ type: "listingCreateRequest" });

      const { data } = await axios.post(
        `${server}/listing/create-listing`,
        listingData, // Send the whole object
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({
        type: "listingCreateSuccess",
        payload: data.listing,
      });
    } catch (error) {
      dispatch({
        type: "listingCreateFail",
        payload: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "clearErrors" });
  };

// get All Listings of a property
export const getAllListingsProperty = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllListingsPropertyRequest",
    });

    const { data } = await axios.get(
      `${server}/listing/get-all-listings-property/${id}`
    );
    dispatch({
      type: "getAllListingsPropertySuccess",
      payload: data.listings,
    });
  } catch (error) {
    dispatch({
      type: "getAllListingsPropertyFailed",
      payload: error.response.data.message,
    });
  }
};

// delete listing of a property
export const deleteListing = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteListingRequest",
    });

    const { data } = await axios.delete(
      `${server}/listing/delete-property-listing/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteListingSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteListingFailed",
      payload: error.response.data.message,
    });
  }
};

// get all listings
export const getAllListings = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllListingsRequest",
    });

    const { data } = await axios.get(`${server}/listing/get-all-listings`);
    dispatch({
      type: "getAllListingsSuccess",
      payload: data.listings,
    });
  } catch (error) {
    dispatch({
      type: "getAllListingsFailed",
      payload: error.response.data.message,
    });
  }
};
