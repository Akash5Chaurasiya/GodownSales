import axios from "axios";
import {transferApiPath,transferQrScanApiPath, sourceTransferVerificationaApi,sourceTransferaddImageApi, destTransferVerificationaApi, destTransferaddImageApi} from '../apiRoutes'




export const getAllTranfer = async () =>{
    try{
        const {data} = await axios.get(`${transferApiPath}` ,{
            withCredentials: true
        })
        console.log("tranfer api data", data)
       return data
    }
    catch(err){
        return (err);
    }
}
export const TransferQrScan = async(barcodeData:any)=>{
    console.log("data", barcodeData)
        try{
            const {data} = await axios.post(`${transferQrScanApiPath}`, barcodeData,{
                withCredentials:true
            })
            console.log("TRANFER qr data ", data)
            return data
    
        }
        catch(err){
            return err;
        }
    }

    export const SourceTranferVerificationSlip = async(dataFormat:any)=>{
    
        try{
            console.log("dataformat on checkaisle pendiing--------",dataFormat.imageString , dataFormat.transferId, dataFormat.aisleId)
            const {data} = await axios.post(`${sourceTransferVerificationaApi}/${dataFormat.aisleId}`, 
             { sourceGodownImage: dataFormat.imageString, transferId:dataFormat.transferId}
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
    
    export const destTransferaddImage = async(dataFormat:any)=>{
    
        try{
            console.log("data on apiiii---------", dataFormat)
            const {data} = await axios.post(`${destTransferaddImageApi}/${dataFormat.transferId}`, 
             { destinationGodownImage: dataFormat.imageString}
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

    export const destTranferVerificationSlip = async(dataFormat:any)=>{
      
        try{
            console.log("dataformat on checkaisle pendiing--------",dataFormat)
            const {data} = await axios.post(`${destTransferVerificationaApi}/${dataFormat.aisleId}`, 
             { price:dataFormat.dprice , quantity:dataFormat.dquantity , transferId:dataFormat.transferId}
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
    
    export const sourceTransferaddImage = async(dataFormat:any)=>{
    
        try{
            console.log("data on apiiii---------", dataFormat)
            const {data} = await axios.post(`${sourceTransferaddImageApi}/${dataFormat.transferId}`, 
             {sourceGodownImage: dataFormat.imageString}
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