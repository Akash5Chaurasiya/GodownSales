
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllSalesSlip, SalesQrScanSlip, SalesVerificationSlip} from '../API/sales'



const initialState ={
    salesSlip:[],
    SalesQrScan:[],
    SalesVerification:[],
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
export const SalesVerificationSlipAsync:any = createAsyncThunk(
    "SalesVerificationSlipAsync",
    async(dataString)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvv-------------",dataString)
            const response:any = await SalesVerificationSlip(dataString) ;
            console.log("verifcation on sales slice  ----", response)
            return response;
        }
        catch(err){
            return err
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
        .addCase(SalesVerificationSlipAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(SalesVerificationSlipAsync.fulfilled, (state, action)=>{
            state.status= 'idle',
            state.SalesVerification= action.payload
            console.log("ssalaesV Payload--------------------", state.SalesQrScan)
        })
    }



    
})


export default SalesSlice.reducer