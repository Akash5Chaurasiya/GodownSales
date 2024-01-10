// import {create}
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTranfer,TransferQrScan, SourceTranferVerificationSlip,sourceTransferaddImage,destTranferVerificationSlip, destTransferaddImage  } from "../API/transfer";




const initialState ={
    sourceTranfer: [],
    destTransfer:[],
    TranferSqrscan:[],
    sourceTranferV:[],
    sourceTransferAddimg:[],
    destTranferV:[],
    destTransferAddimg:[],
    status:'idle'
}



export const getAllTranferAsync:any = createAsyncThunk(
    "getAllTranferAsync",
    async () =>{
        try {
            const response = await getAllTranfer();
            console.log("DataComing for tranfer ------------", response)
            return response
          }
          catch (err) {
            return err;
          }
    }
)
export const TransferSQrScanSlipAsync :any = createAsyncThunk(
    "TransferSQrScanSlipAsync",
    async(barcodeData) =>{
        console.log("barcode on slice on tranfer", barcodeData)
        try{
            console.log("----------------->", barcodeData)
            const response:any = await TransferQrScan(barcodeData);
            console.log("response",response)
             return response
        }
        catch(err){
            return err;
        }
    }
)
export const sourceTranferVerificationSlipAsync:any = createAsyncThunk(
    "sourceTranferVerificationSlipAsync",
    async(dataFormat)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvv-------------",dataFormat)
            const response:any = await SourceTranferVerificationSlip(dataFormat) ;
            console.log("checkkkkk on tranfer slice  ----", response)
            return response;
        }
        catch(err){
            return err
        }
    }
)
export const sourceTransferaddImageAsync:any = createAsyncThunk(
    "sourceTransferaddImageAsync",
    async(dataFormat)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvvactal vvvv-------------",dataFormat)
            const response:any = await sourceTransferaddImage(dataFormat) ;
            console.log("verifcation on tranfer slice  ----", response)
            return response;
        }
        catch(err){
            return err
        }
    }
    
)
export const destTranferVerificationSlipAsync:any = createAsyncThunk(
    "destTranferVerificationSlipAsync",
    async(dataFormat)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvv-------------",dataFormat)
            const response:any = await destTranferVerificationSlip(dataFormat) ;
            console.log("checkkkkk on tranfer slice  ----", response)
            return response;
        }
        catch(err){
            return err
        }
    }
)
export const destTransferaddImageAsync:any = createAsyncThunk(
    "destTransferaddImageAsync",
    async(dataFormat)=>{
        try{
            console.log("vvvvvvvvvvvvvvvvvactal vvvv-------------",dataFormat)
            const response:any = await destTransferaddImage(dataFormat) ;
            console.log("verifcation on tranfer slice  ----", response)
            return response;
        }
        catch(err){
            return err
        }
    }
)

export const Transferlice = createSlice({
    name:'Transferlice',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder 
        .addCase(getAllTranferAsync.pending, (state)=>{
            state.status ='pending'
        })
        .addCase(getAllTranferAsync.fulfilled, (state, action)=>{
            state.status ='fulfilled',
            state.sourceTranfer = action.payload.stransfer
            state.destTransfer= action.payload.dtransfer
            console.log("source tranfer -------------", state.sourceTranfer)

        })
        .addCase(TransferSQrScanSlipAsync.pending, (state)=>{
            state.status ='pending'
        })
        .addCase(TransferSQrScanSlipAsync.fulfilled, (state, action)=>{
            state.status ='fulfilled',
            state.TranferSqrscan = action.payload.data
            console.log("source tranfer after scan -------------",   state.TranferSqrscan)

        })
        .addCase(sourceTranferVerificationSlipAsync.pending, (state)=>{
            state.status ='pending'
        })
        .addCase(sourceTranferVerificationSlipAsync.fulfilled, (state, action)=>{
            state.status ='fulfilled',
            state.sourceTranferV = action.payload
            console.log("source tranfer afterverification scan -------------",   state.sourceTranferV)

        })
        .addCase(sourceTransferaddImageAsync.pending, (state)=>{
            state.status ='pending'
        })
        .addCase(sourceTransferaddImageAsync.fulfilled, (state, action)=>{
            state.status ='fulfilled',
            state.sourceTransferAddimg = action.payload
            console.log("source tranfer afterverificationactualll scan -------------",   state.sourceTransferAddimg)

        })
        .addCase(destTranferVerificationSlipAsync.pending, (state)=>{
            state.status ='pending'
        })
        .addCase(destTranferVerificationSlipAsync.fulfilled, (state, action)=>{
            state.status ='fulfilled',
            state.destTranferV = action.payload
            console.log("source tranfer afterverification scan -------------",   state.destTranferV)

        })
        .addCase(destTransferaddImageAsync.pending, (state)=>{
            state.status ='pending'
        })
        .addCase(destTransferaddImageAsync.fulfilled, (state, action)=>{
            state.status ='fulfilled',
            state.destTransferAddimg = action.payload
            console.log("source tranfer afterverificationactualll scan -------------",   state.destTransferAddimg)

        })
    }
})

export default Transferlice.reducer