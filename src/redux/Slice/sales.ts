
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllSalesSlip, SalesQrScanSlip} from '../API/sales'



const initialState ={
    salesSlip:[],
    SalesQrScan:[],
    status:'idle',
}

export const getAllSalesSlipAsync :any = createAsyncThunk(
    "getAllSalesSlipAsync",
    async() =>{
        try{
            const response:any = await getAllSalesSlip();
            console.log("response",response)
             return response
        }
        catch(err){
            return err;
        }
    }
)
export const SalesQrScanSlipAsync :any = createAsyncThunk(
    "SalesQrScanSlipAsync",
    async(barcodeData) =>{
        console.log("barcode on slice", barcodeData)
        try{
            console.log("----------------->", barcodeData)
            const response:any = await SalesQrScanSlip(barcodeData);
            console.log("response",response)
             return response
        }
        catch(err){
            return err;
        }
    }
)

export const SalesSlice = createSlice({
    name:'SalesSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllSalesSlipAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(getAllSalesSlipAsync.fulfilled, (state, action)=>{
            state.status= 'idle',
            state.salesSlip= action.payload.sales
        })
        .addCase(SalesQrScanSlipAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(SalesQrScanSlipAsync.fulfilled, (state, action)=>{
            state.status= 'idle',
            state.SalesQrScan= action.payload.data
            console.log("saleqrrrscan--------------------", state.SalesQrScan)
        })
    }



    
})


export default SalesSlice.reducer