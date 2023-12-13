import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRecon } from "../API/reconciliation";


const initialState = {
    reconData: [],
    status: 'idle',
    
}

export const getAllReconAsync :any = createAsyncThunk(
    "getAllReconAsync",
    async()=>{
      try{
        const response = await getAllRecon();
        console.log("DataComing for reconci------------", response)
        return response
      }
      catch(err){
        return err;
      }
    }
)

export const ReconciliationSlice = createSlice({
    name:'ReconciliationSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllReconAsync.pending,(state)=>{
               state.status='pending'
        })
        .addCase(getAllReconAsync.fulfilled,(state,action)=>{
            state.status='fulfilled',
            state.reconData= action.payload.Reconciliations
            console.log("onsliec ", state.reconData)
     })
    }
})

export default ReconciliationSlice.reducer