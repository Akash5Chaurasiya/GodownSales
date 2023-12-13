import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScan from '../../../components/BarcodeScan/BarcodeScan'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { SalesQrScanSlipAsync } from '../../../redux/Slice/sales'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
const SalesScanQr = ({navigation}:any) => {
  const dispatch = useDispatch();

  const handleBarcodeScanned = (barcode: string) => {
    // Customize the dispatch action and logic for Screen1
  // --> need  dispatch(purchaseQrScanAsync({ data: barcode }));
 
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
        navigation.navigate('SalesItemDes')

      }
      else{
        // Alert.alert("check your barcode !!")
        // cons

        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: res.payload.message,
        })
        navigation.navigate('Sales')
      }
    })
  };

  const handleBackButton = () => {
    navigation.navigate("Sales");
    return true;
  };
const saleName:any = "Sales";
  return (
   <BarcodeScan onClose={handleBackButton}  onBarcodeScanned={handleBarcodeScanned} name= {saleName} />
  )
}

export default SalesScanQr

const styles = StyleSheet.create({})