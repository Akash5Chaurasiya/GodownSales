import axios from "axios";
import {SalesSlipApiPath, SalesQrScanApiPath, SalesVerificationApiPath} from '../apiRoutes'

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

export const SalesVerificationSlip = async(dataString:any)=>{
    
        try{
            const {data} = await axios.post(`${SalesVerificationApiPath}/${dataString.aisleId}`, 
             { image: dataString.imageString, quantity:dataString.textQuantity, addedBy:dataString.userID, aisleCode:dataString.aisleCode}
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