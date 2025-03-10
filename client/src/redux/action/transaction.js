import axios from "axios";
import { server } from "../../server";

// Get all transactions of a client
export const getAllTransactionsOfClient = (clientId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllTransactionsClientRequest",
    });

    const { data } = await axios.get(
      `${server}/transaction/get-all-transactions/${clientId}`
    );

    dispatch({
      type: "getAllTransactionsClientSuccess",
      payload: data.transactions,
    });
  } catch (error) {
    dispatch({
      type: "getAllTransactionsClientFailed",
      payload: error.response.data.message,
    });
  }
};

// Get all transactions of an agent
export const getAllTransactionsOfAgent = (agentId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllTransactionsAgentRequest",
    });

    const { data } = await axios.get(
      `${server}/transaction/get-agent-all-transactions/${agentId}`
    );

    dispatch({
      type: "getAllTransactionsAgentSuccess",
      payload: data.transactions,
    });
  } catch (error) {
    dispatch({
      type: "getAllTransactionsAgentFailed",
      payload: error.response.data.message,
    });
  }
};

// Get all transactions of Admin
export const getAllTransactionsOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllTransactionsRequest",
    });

    const { data } = await axios.get(`${server}/transaction/admin-all-transactions`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllTransactionsSuccess",
      payload: data.transactions,
    });
  } catch (error) {
    dispatch({
      type: "adminAllTransactionsFailed",
      payload: error.response.data.message,
    });
  }
};
