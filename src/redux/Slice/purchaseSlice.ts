
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllPurchaseSlip, purchaseQrScan} from '../API/purchase'



const initialState ={
    purchaseSlip:[],
    purchaseQrScanData:[],
    status:'idle',
}

export const getAllPurchaseSlipAsync :any = createAsyncThunk(
    "getAllPurchaseSlipAsync",
    async() =>{
        try{
            const response:any = await getAllPurchaseSlip();
            console.log("00",response)
             return response
        }
        catch(err){
            return err;
        }
    }
)

export const purchaseQrScanAsync :any = createAsyncThunk(
    "purchaseQrScanAsync",
    async(akaka) =>{
        console.log("datacode=--------------------------------------------", akaka)
        try{
            const response:any = await purchaseQrScan(akaka);
            console.log("00------------------------------------",response)
             return response
        }
        catch(err){
            return err;
        }
    }
)

  

export const PurchaseSlice =  createSlice({
    name:'PurchaseSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllPurchaseSlipAsync.pending, (state)=>{
            state.status ='loading'
        })
        .addCase(getAllPurchaseSlipAsync.fulfilled, (state,action)=>{
            state.status ='idle',
            state.purchaseSlip = action.payload.purchase
            console.log("--------------------------?", state.purchaseSlip)
        })
        .addCase(purchaseQrScanAsync.pending, (state)=>{
            state.status ='loading'
        })
        .addCase(purchaseQrScanAsync.fulfilled, (state,action)=>{
            state.status ='idle',
            state.purchaseQrScanData= action.payload
            console.log("--------------------------post scaan", state.purchaseQrScanData)
        })
       

    }
})

export default  PurchaseSlice.reducer