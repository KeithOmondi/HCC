import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { clientReducer } from "./reducer/client";
import { transactionReducer } from "./reducer/transaction";
import { agentReducer } from "./reducer/agent";
import { eventReducer } from "./reducer/event";
import { cartReducer } from "./reducer/cart";
import adminReducer from "./reducer/admin";
import { listingReducer } from "./reducer/listing";

// Only persist the admin slice
const adminPersistConfig = {
  key: "admin",
  storage,
};

const rootReducer = combineReducers({
  client: clientReducer,
  transaction: transactionReducer,
  agent: agentReducer,
  listing: listingReducer, // 🔹 Correct key for listing reducer
  event: eventReducer,
  cart: cartReducer,
  admin: persistReducer(adminPersistConfig, adminReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
