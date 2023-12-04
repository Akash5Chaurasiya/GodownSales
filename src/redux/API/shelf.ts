import axios from "axios";
import {getAllShelfApiPath} from '../apiRoutes'

export const getAllShelf  = async()=>{
    try{
        const {data} = await axios.get(`${getAllShelfApiPath}`, {
            withCredentials:true
        })
        console.log("data==============================================", data)
        return data;

    }
    catch(err){
        return err;
    }
}