import { configureStore } from "@reduxjs/toolkit";

import ShelfSlice from "./Slice/shelfSlice";
import PurchaseSlice from "./Slice/purchaseSlice";
import AisleSlice from "./Slice/aisleSlice";
import  SalesSlice  from "./Slice/sales";
import ReconciliationSlice from './Slice/reconciliation'
import Transferlice  from "./Slice/transfer";

export const store=configureStore({
    reducer:{
       shelf:ShelfSlice,
       aisle:AisleSlice,
       purchase:PurchaseSlice,
       sales: SalesSlice,
       reconciliation: ReconciliationSlice,
       transfer: Transferlice
       
    }
})