import axios from "axios";
import {getAllAisleApiPath, scanAisleApiPath, assignAisleApiPath, addImageAisleApiPath, uploadAisleApiPath} from '../apiRoutes'

export const getAllAisle =async(searchQuery:any)=>{
    try {
        console.log("queery name", searchQuery)
        const {data}=await axios.get(`${getAllAisleApiPath}?shelfCode=${searchQuery}`,{
            withCredentials:true
        })
        return data;
    } catch (error) {
        return error
    }
}

export const scanAisle = async(item:any)=>{
    try{ 
        console.log("oooooooooooooooooooooo", item)
        const {data} = await axios.post(`${scanAisleApiPath}`,{data:item},
        {
            withCredentials:true
        })
        return data

    }
    catch(err){
        return err
    }
}

export const assignAisle = async(datapassing:any)=>{
    try{ 
        const {data} = await axios.post(`${assignAisleApiPath}/${datapassing.aisleId}`,{data:datapassing.datascan, addedBy:datapassing.userID},
        {
            withCredentials:true
        })
        console.log("data-----------------------------", data)
        return data

    }
    catch(err){
        return err
    }
}

export const imageUploadAisle = async(filesPassing:any)=>{
    try{ 
        const {data} = await axios.post(`${uploadAisleApiPath}`,filesPassing,
        {
            withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data',

            }
        })
        console.log("data-----------------------------", data)
        return data

    }
    catch(err){
        return err
    }
}

export const addAisleImage = async(datapassing:any)=>{
    try{ 
        const {data} = await axios.post(`${assignAisleApiPath}/${datapassing.aisleId}`,
        { image: datapassing.imageUrl, reason:datapassing.reason, addedBy:datapassing.userID, aisleCode:datapassing.aisleCode},
        {
            withCredentials:true
        })
        console.log("data-----------------------------", data)
        return data

    }
    catch(err){
        return err
    }
}