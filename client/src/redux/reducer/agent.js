import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAgent: false,
  agent: null,
  agents: [],
  error: null,
};

export const agentReducer = createReducer(initialState, (builder) => {
  builder
    // Load single agent
    .addCase("LoadAgentRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadAgentSuccess", (state, action) => {
      state.isAgent = true;
      state.isLoading = false;
      state.agent = action.payload;
    })
    .addCase("LoadAgentFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAgent = false;
    })

    // Get all agents --- admin
    .addCase("getAllAgentsRequest", (state) => {
      state.isLoading = true;
      state.agents = []; // Reset agents list on new request
    })
    .addCase("getAllAgentsSuccess", (state, action) => {
      state.isLoading = false;
      state.agents = action.payload || []; // Ensure it's an array
    })
    .addCase("getAllAgentsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
