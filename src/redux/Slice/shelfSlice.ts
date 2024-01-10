import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllShelf } from "../API/shelf";

const initialState ={
    allslices:[],
    status:'idle'
}
export const getAllShelfAsync:any = createAsyncThunk(
    "getAllShelfAsync",
    async()=>{
        try{
            const response:any = await getAllShelf();
            return response;
        }
        catch(err){
            return err
        }
    }
)

export const ShelfSlice = createSlice({
    name:'ShelfSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllShelfAsync.pending,(state)=>{
            state.status='pending'
        })
        .addCase(getAllShelfAsync.fulfilled,(state, action)=>{
            state.status='fulfilled',
            // console.log("action-----", action.payload.data)
            state.allslices = action.payload.data
            // console.log("slices checking", state.allslices )
        })
    }

})

export default ShelfSlice.reducer