import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScan from '../../../components/BarcodeScan/BarcodeScan';
import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { TransferSQrScanSlipAsync } from '../../../redux/Slice/transfer';

const DTranferScanQr = ({navigation}:any) => {

  
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
      navigation.navigate('DSourceGodownDes')
    }
    else{
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: res.payload.message,
      })
      navigation.navigate('DTransfer')

    }
  })
  };

  const handleBackButton = () => {
    navigation.navigate("DTransfer");
    return true;
  };
  const  namePass = "Transfer Slip"
  return (
   <BarcodeScan onClose={handleBackButton}  onBarcodeScanned={handleBarcodeScanned} name={namePass}/>
  )
}

export default DTranferScanQr

const styles = StyleSheet.create({})