import axios from "axios";
import {purchaserSlipApiPath, purchaseQrScanApiPath, purchaseVerificationApiPath} from '../apiRoutes'

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
        // console.error("Error during QR scan:", err.message);
        return err;
    }
}

export const purchaseVerificationSlip = async(dataString:any)=>{
    
    try{
        const {data} = await axios.post(`${purchaseVerificationApiPath}/${dataString.purchaseSlipId}`, 
         { image: dataString.imageString, quantity:dataString.textQuantity, addedBy:dataString.userID, aisleId:dataString.aisleID}
        ,{
            withCredentials:true
        })
        console.log("verification sales ", data)
        return data

    }
    catch(err){
        return err;
    }
}