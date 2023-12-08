import axios from "axios";
import {SalesSlipApiPath, SalesQrScanApiPath} from '../apiRoutes'

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