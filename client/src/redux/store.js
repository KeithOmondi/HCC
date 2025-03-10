import { configureStore } from "@reduxjs/toolkit";
import { clientReducer } from "./reducer/client";
import { transactionReducer } from "./reducer/transaction";
import { agentReducer } from "./reducer/agent";
import { listingReducer } from "./reducer/listing";
import { eventReducer } from "./reducer/event";
import { cartReducer } from "./reducer/cart";


const Store = configureStore({
    reducer: {
        client: clientReducer,
        transaction: transactionReducer,
        agent: agentReducer,
        listing: listingReducer,
        event: eventReducer,
        cart: cartReducer
    }
})

export default Store;