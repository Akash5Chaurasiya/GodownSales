import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAisle,scanAisle,assignAisle ,imageUploadAisle, addAisleImage} from "../API/aisle";

const initialState ={
    allaisle:[],
    scanaisle:[],
    assignaisle:[],
    upploadaisleImage :[],
    addImageaisle:[],
    status:'idle'
}
export const getAllAlisleAsync:any = createAsyncThunk(
    "getAllAlisleAsync",
    async(searchQuery)=>{
        try{
            console.log("seach", searchQuery)
            const response:any = await getAllAisle(searchQuery) ;
            // console.log("ressssss", response)
            return response;

        }
        catch(err){
            return err
        }
    }
)

export const scanAlisleAsync:any = createAsyncThunk(
    "scanAlisleAsync",
    async(item)=>{
        try{
            console.log("seach", item)
            const response:any = await scanAisle(item) ;
            // console.log("ressssss", response)
            return response;

        }
        catch(err){
            return err
        }
    }
)

export const assignAlisleAsync:any = createAsyncThunk(
    "assignAlisleAsync",
    async(datapassing)=>{
        try{
            console.log("seach---------. testing-------------",datapassing)
            const response:any = await assignAisle(datapassing) ;
            // console.log("ressssss", response)
            return response;

        }
        catch(err){
            return err
        }
    }
)
export const imageUploadAisleAsync:any = createAsyncThunk(
    "imageUploadAisleAsync",
    async(datapassing)=>{
        try{
            console.log("seach---------. testing-------------",datapassing)
            const response:any = await imageUploadAisle(datapassing) ;
            // console.log("ressssss", response)
            return response;
        }
        catch(err){
            return err
        }
    }
)
export const addAisleImageAsync:any = createAsyncThunk(
    "addAisleImageAsync",
    async(datapassing)=>{
        try{
            console.log("seach---------. testing-------------",datapassing)
            const response:any = await addAisleImage(datapassing) ;
            // console.log("ressssss", response)
            return response;
        }
        catch(err){
            return err
        }
    }
)
export const AisleSlice = createSlice({
    name:'AisleSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllAlisleAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(getAllAlisleAsync.fulfilled,(state, action)=>{
            state.status = 'completed',
           state.allaisle = action.payload.data
           
           
        })
        .addCase(scanAlisleAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(scanAlisleAsync.fulfilled,(state, action)=>{
            state.status='fulfilled',
           state.scanaisle = action.payload
           console.log("on scan slice", state.scanaisle)
           
           
        })
        .addCase(assignAlisleAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(assignAlisleAsync.fulfilled,(state, action)=>{
            state.status='fulfilled',
           state.assignaisle = action.payload
           console.log("on assignslice", state.assignaisle)   
        })
        .addCase(imageUploadAisleAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(imageUploadAisleAsync.fulfilled,(state, action)=>{
            state.status='fulfilled',
           state.upploadaisleImage = action.payload
           console.log("on assignslice", state.upploadaisleImage)
        })
        .addCase(addAisleImageAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(addAisleImageAsync.fulfilled,(state, action)=>{
            state.status='fulfilled',
           state.addImageaisle = action.payload
           console.log("on assignslice", state.addImageaisle)
        })
    }

})

export default AisleSlice.reducer