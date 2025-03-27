import axios from "axios";
import { server } from "../../server";

// Get all agents --- admin
export const getAllAgents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllAgentsRequest" });

    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("Admin authentication required");

    const response = await axios.get(`${server}/property/admin-all-agents`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    dispatch({ type: "getAllAgentsSuccess", payload: response.data.agents || [] });
  } catch (error) {
    console.error("Error fetching agents:", error.response?.data || error);
    dispatch({
      type: "getAllAgentsFailed",
      payload: error.response?.data?.message || "Failed to fetch agents",
    });
  }
};

