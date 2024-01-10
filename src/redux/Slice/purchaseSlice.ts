
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllPurchaseSlip, purchaseQrScan, purchaseVerificationSlip,purchaseAddImage} from '../API/purchase'



const initialState ={
    purchaseSlip:[],
    purchaseQrScanData:{},
    purchaseVerification:[],
    purchaseAddImageData:[],
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
    async(dataStringItemAdd)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvv-------------",dataStringItemAdd)
            const response:any = await purchaseVerificationSlip(dataStringItemAdd) ;
            console.log("verifcation on sales slice  ----", response)
            return response;
        }
        catch(err){
            return err
        }
    }
)
export const purchaseAddImageAsync:any = createAsyncThunk(
    "purchaseAddImageAsync",
    async(dataStringItemAdd)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvv-------------",dataStringItemAdd)
            const response:any = await purchaseAddImage(dataStringItemAdd) ;
            console.log("verifcationlast  on sales slice  ----", response)
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
            state.status ='pending'
        })
        .addCase(getAllPurchaseSlipAsync.fulfilled, (state,action)=>{
            state.status ='fulfilled',
            state.purchaseSlip = action.payload.purchase
            console.log("--------------------------?", state.purchaseSlip)
        })
        .addCase(purchaseQrScanAsync.pending, (state)=>{
            state.status ='pending'
        })
        .addCase(purchaseQrScanAsync.fulfilled, (state,action)=>{
            state.status ='fulfilled';
            // if(action.payload.success){
                state.purchaseQrScanData= action.payload.data

            // }
           
            console.log("--------------------------post scaan", state.purchaseQrScanData)
        })
        .addCase(purchaseVerificationSlipAsync.pending, (state)=>{
            state.status='pending'
        })
        .addCase(purchaseVerificationSlipAsync.fulfilled, (state, action)=>{
            state.status= 'fulfilled',
            state.purchaseVerification= action.payload
            console.log("purchase V Payload--------------------", state.purchaseVerification)
        })
        .addCase(purchaseAddImageAsync.pending, (state)=>{
            state.status='pending'
        })
        .addCase(purchaseAddImageAsync.fulfilled, (state, action)=>{
            state.status= 'fulfilled',
            state.purchaseAddImageData= action.payload
            console.log("purchase V Payload--------------------", state.purchaseAddImageData)
        })
       

    }
})

export default  PurchaseSlice.reducer