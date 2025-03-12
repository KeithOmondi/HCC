import axios from "axios";
import { server } from "../../server";

// Load client
export const loadClient = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadClientRequest" });

    const { data } = await axios.get(`${server}/client/getclient`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadClientSuccess",
      payload: data.client,
    });
  } catch (error) {
    dispatch({
      type: "LoadClientFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Load property
export const loadProperty = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadPropertyRequest" });

    const { data } = await axios.get(`${server}/property/getProperty`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadPropertySuccess",
      payload: data.property,
    });
  } catch (error) {
    dispatch({
      type: "LoadPropertyFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Update client information
export const updateClientInformation = (name, email, phoneNumber, password) => async (dispatch) => {
  try {
    dispatch({ type: "updateClientInfoRequest" });

    const { data } = await axios.put(
      `${server}/client/update-client-info`,
      { email, password, phoneNumber, name },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }, // ✅ Added correct headers
      }
    );

    dispatch({
      type: "updateClientInfoSuccess",
      payload: data.client,
    });
  } catch (error) {
    dispatch({
      type: "updateClientInfoFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Update client address
export const updateClientAddress = (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
  try {
    dispatch({ type: "updateClientAddressRequest" });

    const { data } = await axios.put(
      `${server}/client/update-client-addresses`,
      { country, city, address1, address2, zipCode, addressType },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }, // ✅ Added correct headers
      }
    );

    dispatch({
      type: "updateClientAddressSuccess",
      payload: {
        successMessage: "Client address updated successfully!",
        client: data.client,
      },
    });
  } catch (error) {
    dispatch({
      type: "updateClientAddressFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Delete client address
export const deleteClientAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteClientAddressRequest" });

    const { data } = await axios.delete(`${server}/client/delete-client-address/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteClientAddressSuccess",
      payload: {
        successMessage: "Client address deleted successfully!",
        client: data.client,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteClientAddressFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Get all clients --- admin
export const getAllClients = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllClientsRequest" });

    const { data } = await axios.get(`${server}/client/admin-all-clients`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllClientsSuccess",
      payload: data.clients,
    });
  } catch (error) {
    dispatch({
      type: "getAllClientsFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
