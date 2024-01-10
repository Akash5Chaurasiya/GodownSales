

import axios from "axios";
import {ReconcilitionApiPath, reconUploadApiPath} from '../apiRoutes'

export const  getAllRecon = async ()=>{

    try{
        const {data} = await axios.get(`${ReconcilitionApiPath}`,{
            withCredentials:true
        })
        console.log("data of  reconsn", data)
        return data

    }
    catch(err){
        return err;
    }
}



export const  reconUpdateItems = async (apiPayloadData:any)=>{

    try{
        console.log("on api recon item", apiPayloadData)
        const {data} = await axios.patch(`${reconUploadApiPath}/${apiPayloadData.reconID}`,apiPayloadData.apiPayload,{
            withCredentials:true
        })
        console.log("data after uploadedd of reconsilation item  ", data)
        return data

    }
    catch(err){
        return err;
    }
}



