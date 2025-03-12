import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  client: null,
  clients: [],
  loading: false,
  addressLoading: false,
  clientsLoading: false,
  error: null,
  successMessage: null,
};

export const clientReducer = createReducer(initialState, (builder) => {
  builder
    // Load Client
    .addCase("LoadClientRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadClientSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.client = action.payload;
      state.error = null;
    })
    .addCase("LoadClientFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    // Update Client Info
    .addCase("updateClientInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateClientInfoSuccess", (state, action) => {
      state.loading = false;
      state.client = action.payload;
      state.error = null;
      state.successMessage = "Client information updated successfully!";
    })
    .addCase("updateClientInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Client Address
    .addCase("updateClientAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("updateClientAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.client = action.payload.client;
      state.error = null;
    })
    .addCase("updateClientAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Delete Client Address
    .addCase("deleteClientAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("deleteClientAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.client = action.payload.client;
      state.error = null;
    })
    .addCase("deleteClientAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Get All Clients (Admin)
    .addCase("getAllClientsRequest", (state) => {
      state.clientsLoading = true;
    })
    .addCase("getAllClientsSuccess", (state, action) => {
      state.clientsLoading = false;
      state.clients = action.payload;
      state.error = null;
    })
    .addCase("getAllClientsFailed", (state, action) => {
      state.clientsLoading = false;
      state.error = action.payload;
    })

    // Logout Client
    .addCase("LogoutSuccess", (state) => {
      state.isAuthenticated = false;
      state.client = null;
      state.error = null;
      state.successMessage = "Logged out successfully!";
    })

    // Clear Errors and Messages
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    });
});
