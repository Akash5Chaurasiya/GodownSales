import axios from "axios";
import {SalesSlipApiPath, SalesQrScanApiPath, SalesVerificationApiPath, SalesRemoveItemApiPath} from '../apiRoutes'

export const getAllSalesSlip = async()=>{

    try{
        const {data} = await axios.get(`${SalesSlipApiPath}`,{
            withCredentials:true
        })
        console.log("data of sales", data)
        return data

    }
    catch(err){
        return err;
    }
}

export const SalesQrScanSlip = async(barcodeData:any)=>{
console.log("data", barcodeData)
    try{
        const {data} = await axios.post(`${SalesQrScanApiPath}`, barcodeData,{
            withCredentials:true
        })
        console.log("sales qr data ", data)
        return data

    }
    catch(err){
        return err;
    }
}
//  params m -> salesslip ki id 
// asisle id = aisle id 

export const SalesRemoveItem = async(dataString:any)=>{
    
        try{
            const {data} = await axios.post(`${SalesRemoveItemApiPath}/${dataString.salesSlipId}`, 
             {  quantity:dataString.textQuantity, addedBy:dataString.userID, aisleId:dataString.aisleID}
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
    //sales remove item 

    export const SalesVerificationSlip = async(dataString:any)=>{
      console.log("objjjj", dataString)
        try{
            const {data} = await axios.post(`${SalesVerificationApiPath}/${dataString.SalesSlipId}`, 
             { image: dataString.imageString,  addedBy:dataString.userID, aisle:dataString.aisleID}
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