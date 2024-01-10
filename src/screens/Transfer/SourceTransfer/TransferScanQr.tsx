import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScan from '../../../components/BarcodeScan/BarcodeScan';
import { useDispatch } from 'react-redux';
import {TransferSQrScanSlipAsync} from '../../../redux/Slice/transfer'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
const TransferScanQr = ({navigation}:any) => {
  
  
    const dispatch = useDispatch();
  
  
    const handleBarcodeScanned = (barcode: string) => {
        const datasplit = barcode.replace(/s\//g, '').replace(/"/g, '');
        const barcodeData = {"data": datasplit}
    console.log("barcode", barcodeData)
      dispatch(TransferSQrScanSlipAsync(barcodeData)).then((res:any)=>{
       
       
  
        if(res.payload.status){
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: 'Successfully barcode scan',
          })
          navigation.navigate('SourceGodownDes')
  
        }
        else{
       Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: res.payload.message,
          })
          navigation.navigate('STransfer')
        }
      })
    };
    const handleBackButton = () => {
        navigation.navigate("STransfer");
        return true;
      };
    const namePass = "Tranfer slip"
  return (
    <BarcodeScan onClose={handleBackButton}  onBarcodeScanned={handleBarcodeScanned}  name={namePass}/>
  )
}

export default TransferScanQr

const styles = StyleSheet.create({})