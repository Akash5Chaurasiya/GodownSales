import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScan from '../../../components/BarcodeScan/BarcodeScan'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { SalesQrScanSlipAsync } from '../../../redux/Slice/sales'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const ReconScanQr = ({navigation,route}:any) => {
  const {itemId} = route.params
  const dispatch = useDispatch();

  const handleBarcodeScanned = (barcode: string) => {
  
 
  const datasplit = barcode.replace(/s\//g, '').replace(/"/g, '');
  const barcodeData = {"data": datasplit}
  console.log("barcode", barcodeData)
    dispatch(SalesQrScanSlipAsync(barcodeData)).then((res:any)=>{
      console.log("------------", res.payload)
      if(res.payload.status){
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: 'Successfully barcode scan',
        })
        navigation.navigate('ReconAisleDes')

      }
      else{
        // Alert.alert("check your barcode !!")
        // cons

        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: res.payload.message,
        })
        navigation.navigate('Reconciliation')
      }
    })
  };

  const handleBackButton = () => {
    navigation.navigate("Reconciliation");
    return true;
  };
  return (
    <BarcodeScan onClose={handleBackButton}  onBarcodeScanned={handleBarcodeScanned} />
   )
}

export default ReconScanQr

const styles = StyleSheet.create({})