import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const clientReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadClientRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadClientSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.client = action.payload;
    })
    .addCase("LoadClientFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    // Update client information
    .addCase("updateClientInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateClientInfoSuccess", (state, action) => {
      state.loading = false;
      state.client = action.payload;
    })
    .addCase("updateClientInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update client address
    .addCase("updateClientAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("updateClientAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.client = action.payload.client;
    })
    .addCase("updateClientAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Delete client address
    .addCase("deleteClientAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("deleteClientAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.client = action.payload.client;
    })
    .addCase("deleteClientAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Get all clients --- admin
    .addCase("getAllClientsRequest", (state) => {
      state.clientsLoading = true;
    })
    .addCase("getAllClientsSuccess", (state, action) => {
      state.clientsLoading = false;
      state.clients = action.payload;
    })
    .addCase("getAllClientsFailed", (state, action) => {
      state.clientsLoading = false;
      state.error = action.payload;
    })

    // Clear errors and messages
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    });
});
