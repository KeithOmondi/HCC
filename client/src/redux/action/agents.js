import axios from "axios";
import { server } from "../../server";

// get all agents --- admin
export const getAllAgents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllAgentsRequest",
    });

    const { data } = await axios.get(`${server}/property/admin-all-agents`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllAgentsSuccess",
      payload: data.agents,
    });
  } catch (error) {
    dispatch({
      type: "getAllAgentsFailed",
      payload: error.response?.data?.message || "Failed to fetch agents",
    });
  }
};
