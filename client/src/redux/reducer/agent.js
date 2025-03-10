import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const agentReducer = createReducer(initialState, (builder) => {
  builder
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
    })
    .addCase("getAllAgentsSuccess", (state, action) => {
      state.isLoading = false;
      state.agents = action.payload;
    })
    .addCase("getAllAgentsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
