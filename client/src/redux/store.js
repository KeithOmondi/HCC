import { configureStore } from "@reduxjs/toolkit";
import { clientReducer } from "./reducer/client";
import { transactionReducer } from "./reducer/transaction";
import { agentReducer } from "./reducer/agent";
import { listingReducer } from "./reducer/listing";
import { eventReducer } from "./reducer/event";
import { cartReducer } from "./reducer/cart";
import { adminReducer } from "./reducer/admin";


const Store = configureStore({
    reducer: {
        client: clientReducer,
        transaction: transactionReducer,
        agent: agentReducer,
        listing: listingReducer,
        event: eventReducer,
        cart: cartReducer,
        admin: adminReducer
    }
})

export default Store;