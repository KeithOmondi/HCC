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

// 🔹 Persist Config for Admin Only
const adminPersistConfig = {
  key: "admin",
  storage,
};

// 🔹 Combining Reducers
const rootReducer = combineReducers({
  client: clientReducer,
  transaction: transactionReducer,
  agent: agentReducer,
  listing: listingReducer,
  event: eventReducer,
  cart: cartReducer,
  admin: persistReducer(adminPersistConfig, adminReducer), // ✅ Persisting only 'admin' reducer
});

// 🔹 Configure Store
export const store = configureStore({
  reducer: rootReducer, // ✅ No need to persist entire rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevent serialization issues
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development
});

// 🔹 Persistor
export const persistor = persistStore(store);
