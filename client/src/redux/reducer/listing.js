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
} from "../action/actionTypes";

const initialState = {
  listings: [],
  loading: false,
  error: null,
};

export const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTING_CREATE_REQUEST:
    case GET_ALL_LISTINGS_PROPERTY_REQUEST:
    case DELETE_LISTING_REQUEST:
    case GET_ALL_LISTINGS_REQUEST:
      return { ...state, loading: true };

    case LISTING_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        listings: [...state.listings, action.payload],
      };

    case GET_ALL_LISTINGS_PROPERTY_SUCCESS:
    case GET_ALL_LISTINGS_SUCCESS:
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        listings: action.payload,
      };

    case DELETE_LISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        listings: state.listings.filter((listing) => listing._id !== action.payload),
      };

    case FETCH_LISTINGS_FAILURE:
    case LISTING_CREATE_FAIL:
    case GET_ALL_LISTINGS_PROPERTY_FAIL:
    case DELETE_LISTING_FAIL:
    case GET_ALL_LISTINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
