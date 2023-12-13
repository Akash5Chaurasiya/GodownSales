
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllPurchaseSlip, purchaseQrScan, purchaseVerificationSlip} from '../API/purchase'



const initialState ={
    purchaseSlip:[],
    purchaseQrScanData:[],
    purchaseVerification:[],
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

export const purchaseVerificationSlipAsync:any = createAsyncThunk(
    "purchaseVerificationSlipAsync",
    async(dataString)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvv-------------",dataString)
            const response:any = await purchaseVerificationSlip(dataString) ;
            console.log("verifcation on sales slice  ----", response)
            return response;
        }
        catch(err){
            return err
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
            state.purchaseQrScanData= action.payload.data
            console.log("--------------------------post scaan", state.purchaseQrScanData)
        })
        .addCase(purchaseVerificationSlipAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(purchaseVerificationSlipAsync.fulfilled, (state, action)=>{
            state.status= 'idle',
            state. purchaseVerification= action.payload
            console.log("purchase V Payload--------------------", state.purchaseVerification)
        })
       

    }
})

export default  PurchaseSlice.reducer