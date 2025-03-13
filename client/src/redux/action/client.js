import axios from "axios";
import { server } from "../../server";
import {
  LOAD_CLIENT_REQUEST,
  LOAD_CLIENT_SUCCESS,
  LOAD_CLIENT_FAIL,
  LOAD_PROPERTY_REQUEST,
  LOAD_PROPERTY_SUCCESS,
  LOAD_PROPERTY_FAIL,
  UPDATE_CLIENT_INFO_REQUEST,
  UPDATE_CLIENT_INFO_SUCCESS,
  UPDATE_CLIENT_INFO_FAIL,
  UPDATE_CLIENT_ADDRESS_REQUEST,
  UPDATE_CLIENT_ADDRESS_SUCCESS,
  UPDATE_CLIENT_ADDRESS_FAIL,
  DELETE_CLIENT_ADDRESS_REQUEST,
  DELETE_CLIENT_ADDRESS_SUCCESS,
  DELETE_CLIENT_ADDRESS_FAIL,
  GET_ALL_CLIENTS_REQUEST,
  GET_ALL_CLIENTS_SUCCESS,
  GET_ALL_CLIENTS_FAIL,
} from "./actionTypes";

// Reusable API Request Handler
const apiRequest = async (dispatch, requestType, successType, failType, apiCall) => {
  try {
    dispatch({ type: requestType });
    const { data } = await apiCall();
    dispatch({ type: successType, payload: data });
  } catch (error) {
    dispatch({
      type: failType,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Load client
export const loadClient = () => async (dispatch) => {
  await apiRequest(
    dispatch,
    LOAD_CLIENT_REQUEST,
    LOAD_CLIENT_SUCCESS,
    LOAD_CLIENT_FAIL,
    () => axios.get(`${server}/client/getclient`, { withCredentials: true })
  );
};

// Load property
export const loadProperty = () => async (dispatch) => {
  await apiRequest(
    dispatch,
    LOAD_PROPERTY_REQUEST,
    LOAD_PROPERTY_SUCCESS,
    LOAD_PROPERTY_FAIL,
    () => axios.get(`${server}/property/getProperty`, { withCredentials: true })
  );
};

// Update client information
export const updateClientInformation = (name, email, phoneNumber, password) => async (dispatch) => {
  await apiRequest(
    dispatch,
    UPDATE_CLIENT_INFO_REQUEST,
    UPDATE_CLIENT_INFO_SUCCESS,
    UPDATE_CLIENT_INFO_FAIL,
    () =>
      axios.put(
        `${server}/client/update-client-info`,
        { email, password, phoneNumber, name },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      )
  );
};

// Update client address
export const updateClientAddress = (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
  await apiRequest(
    dispatch,
    UPDATE_CLIENT_ADDRESS_REQUEST,
    UPDATE_CLIENT_ADDRESS_SUCCESS,
    UPDATE_CLIENT_ADDRESS_FAIL,
    () =>
      axios.put(
        `${server}/client/update-client-addresses`,
        { country, city, address1, address2, zipCode, addressType },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      )
  );
};

// Delete client address
export const deleteClientAddress = (id) => async (dispatch) => {
  await apiRequest(
    dispatch,
    DELETE_CLIENT_ADDRESS_REQUEST,
    DELETE_CLIENT_ADDRESS_SUCCESS,
    DELETE_CLIENT_ADDRESS_FAIL,
    () => axios.delete(`${server}/client/delete-client-address/${id}`, { withCredentials: true })
  );
};

// Get all clients (Admin)
export const getAllClients = () => async (dispatch) => {
  await apiRequest(
    dispatch,
    GET_ALL_CLIENTS_REQUEST,
    GET_ALL_CLIENTS_SUCCESS,
    GET_ALL_CLIENTS_FAIL,
    () => axios.get(`${server}/client/admin-all-clients`, { withCredentials: true })
  );
};
