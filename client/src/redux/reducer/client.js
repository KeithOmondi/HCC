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
    .addCase("LOAD_CLIENT_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOAD_CLIENT_SUCCESS", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.client = action.payload;
      state.error = null;
    })
    .addCase("LOAD_CLIENT_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    // Update Client Info
    .addCase("UPDATE_CLIENT_INFO_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("UPDATE_CLIENT_INFO_SUCCESS", (state, action) => {
      state.loading = false;
      state.client = action.payload;
      state.error = null;
      state.successMessage = "Client information updated successfully!";
    })
    .addCase("UPDATE_CLIENT_INFO_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Client Address
    .addCase("UPDATE_CLIENT_ADDRESS_REQUEST", (state) => {
      state.addressLoading = true;
    })
    .addCase("UPDATE_CLIENT_ADDRESS_SUCCESS", (state, action) => {
      state.addressLoading = false;
      state.client = action.payload.client;
      state.successMessage = action.payload.successMessage;
      state.error = null;
    })
    .addCase("UPDATE_CLIENT_ADDRESS_FAIL", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Delete Client Address
    .addCase("DELETE_CLIENT_ADDRESS_REQUEST", (state) => {
      state.addressLoading = true;
    })
    .addCase("DELETE_CLIENT_ADDRESS_SUCCESS", (state, action) => {
      state.addressLoading = false;
      state.client = action.payload.client;
      state.successMessage = action.payload.successMessage;
      state.error = null;
    })
    .addCase("DELETE_CLIENT_ADDRESS_FAIL", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Get All Clients (Admin)
    .addCase("GET_ALL_CLIENTS_REQUEST", (state) => {
      state.clientsLoading = true;
    })
    .addCase("GET_ALL_CLIENTS_SUCCESS", (state, action) => {
      state.clientsLoading = false;
      state.clients = action.payload; // Ensure API returns full list
      state.error = null;
    })
    .addCase("GET_ALL_CLIENTS_FAIL", (state, action) => {
      state.clientsLoading = false;
      state.error = action.payload;
    })

    // Logout Client
    .addCase("LOGOUT_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOGOUT_SUCCESS", (state) => {
      state.isAuthenticated = false;
      state.client = null;
      state.error = null;
      state.successMessage = "Logged out successfully!";
      state.loading = false;
    })
    .addCase("LOGOUT_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Clear Errors and Messages
    .addCase("CLEAR_ERRORS", (state) => {
      state.error = null;
    })
    .addCase("CLEAR_MESSAGES", (state) => {
      state.successMessage = null;
    });
});
