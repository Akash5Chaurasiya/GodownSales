import axios from "axios";
import {purchaserSlipApiPath, purchaseQrScanApiPath} from '../apiRoutes'

export const getAllPurchaseSlip = async()=>{

    try{
        const {data} = await axios.get(`${purchaserSlipApiPath}`,{
            withCredentials:true
        })
        console.log("data.....................................................", data)
        return data

    }
    catch(err){
        return err;
    }
}
export const purchaseQrScan = async(datacode:any)=>{

    try{
        console.log("scannnnn->", datacode)
        const {data} = await axios.post(`${purchaseQrScanApiPath}`,datacode,{
            withCredentials:true
        })
        console.log("data.. WHILE SCAN...................................................", data)
        return data

    }
    catch(err){
        console.error("Error during QR scan:", err.message);
        return err;
    }
}