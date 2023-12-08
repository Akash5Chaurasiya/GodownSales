

import axios from "axios";
import {ReconcilitionApiPath} from '../apiRoutes'

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






