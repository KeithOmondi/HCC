import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const transactionReducer = createReducer(initialState, (builder) => {
  builder
    // Get all transactions of a client
    .addCase("getAllTransactionsClientRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllTransactionsClientSuccess", (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
    })
    .addCase("getAllTransactionsClientFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all transactions of an agent
    .addCase("getAllTransactionsAgentRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllTransactionsAgentSuccess", (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
    })
    .addCase("getAllTransactionsAgentFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all transactions for admin
    .addCase("adminAllTransactionsRequest", (state) => {
      state.adminTransactionLoading = true;
    })
    .addCase("adminAllTransactionsSuccess", (state, action) => {
      state.adminTransactionLoading = false;
      state.adminTransactions = action.payload;
    })
    .addCase("adminAllTransactionsFailed", (state, action) => {
      state.adminTransactionLoading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
