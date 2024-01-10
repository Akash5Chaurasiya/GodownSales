import axios from "axios";
import {purchaserSlipApiPath, purchaseQrScanApiPath, purchaseVerificationApiPath,purchaseAddImageApiPath} from '../apiRoutes'

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

export const purchaseVerificationSlip = async(dataStringItemAdd:any)=>{
 console.log("parammm", dataStringItemAdd)
    try{
        const {data} = await axios.post(`${purchaseVerificationApiPath}/${dataStringItemAdd.purchaseSlipId}`, 
         {  quantity:dataStringItemAdd.textQuantity, addedBy:dataStringItemAdd.userID, aisleId:dataStringItemAdd.aisleID}
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
export const purchaseAddImage = async(dataStringItemAdd:any)=>{
    console.log("parammm--r-r-", dataStringItemAdd)
       try{
           const {data} = await axios.post(`${purchaseAddImageApiPath}/${dataStringItemAdd.purchaseSlipId}`, 
            {  image:dataStringItemAdd.imageString, aisle:dataStringItemAdd.aisleID}
           ,{
               withCredentials:true
           })
           console.log("purchase last vvvv ", data)
           return data
   
       }
       catch(err){
           return err;
       }
   }