import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRecon, reconUpdateItems } from "../API/reconciliation";


const initialState = {
  reconData: [],
  reconUpdateItem: [],
  status: 'idle',

}

export const getAllReconAsync: any = createAsyncThunk(
  "getAllReconAsync",
  async () => {
    try {
      const response = await getAllRecon();
      console.log("DataComing for reconci------------", response)
      return response
    }
    catch (err) {
      return err;
    }
  }
)
export const reconUpdateItemsAsync: any = createAsyncThunk(
  "reconUpdateItemsAsync",
  async (apiPayloadData) => {
    try {
      console.log("api paylod in slice-----------------------------", apiPayloadData)
      const response = await reconUpdateItems(apiPayloadData);
      console.log("update slice recon ----------", response)
      return response
    }
    catch (err) {
      return err;
    }
  }
)

export const ReconciliationSlice = createSlice({
  name: 'ReconciliationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReconAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getAllReconAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled',
          state.reconData = action.payload.Reconciliations
        console.log("onsliec ", state.reconData)
      })
      .addCase(reconUpdateItemsAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(reconUpdateItemsAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled',
          state.reconUpdateItem = action.payload
        console.log("onsliec ", state.reconUpdateItem)
      })
  }
})



export default ReconciliationSlice.reducer