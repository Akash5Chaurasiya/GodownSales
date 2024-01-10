
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllSalesSlip, SalesQrScanSlip, SalesVerificationSlip, SalesRemoveItem} from '../API/sales'



const initialState ={
    salesSlip:[],
    SalesQrScan:{},
    SalesVerification:[],
    SalesRemoveItem:[],
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
export const SalesRemoveItemAsync:any = createAsyncThunk(
    "SalesRemoveItemAsync",
    async(dataString)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvv-------------",dataString)
            const response:any = await SalesRemoveItem(dataString) ;
            console.log("remove item  on sales slice  ----", response)
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
            state.status='pending'
        })
        .addCase(getAllSalesSlipAsync.fulfilled, (state, action)=>{
            state.status= 'fulfilled',
            state.salesSlip= action.payload.sales
        })
        .addCase(SalesQrScanSlipAsync.pending, (state)=>{
            state.status='pending'
        })
        .addCase(SalesQrScanSlipAsync.fulfilled, (state, action)=>{
            state.status= 'fulfilled',
            state.SalesQrScan= action.payload.data
            console.log("saleqrrrscan--------------------", state.SalesQrScan)
        })
        .addCase(SalesVerificationSlipAsync.pending, (state)=>{
            state.status='pending'
        })
        .addCase(SalesVerificationSlipAsync.fulfilled, (state, action)=>{
            state.status= 'fulfilled',
            state.SalesVerification= action.payload
            // console.log("ssalaesV Payload--------------------", state.SalesQrScan)
        })
        .addCase(SalesRemoveItemAsync.pending, (state)=>{
            state.status='pending'
        })
        .addCase(SalesRemoveItemAsync.fulfilled, (state, action)=>{
            state.status= 'fulfilled',
            state.SalesRemoveItem= action.payload
            // console.log("ssalaesV Payload--------------------", state.SalesQrScan)
        })
    }



    
})


export default SalesSlice.reducer