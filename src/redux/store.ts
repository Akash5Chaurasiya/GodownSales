import { configureStore } from "@reduxjs/toolkit";

import ShelfSlice from "./Slice/shelfSlice";
import PurchaseSlice from "./Slice/purchaseSlice";
import AisleSlice from "./Slice/aisleSlice";

export const store=configureStore({
    reducer:{
       shelf:ShelfSlice,
       aisle:AisleSlice,
       purchase:PurchaseSlice,
    }
})