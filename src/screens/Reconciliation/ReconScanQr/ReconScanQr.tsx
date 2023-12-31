import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScan from '../../../components/BarcodeScan/BarcodeScan'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { scanAlisleAsync} from '../../../redux/Slice/aisleSlice'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const ReconScanQr = ({navigation,route}:any) => {
  const {aisleCode} = route.params
  
  console.log("coming route param s", aisleCode)
  const dispatch = useDispatch();
  const dataAfterScan = useSelector((state:any)=>state.aisle.scanaisle)
  const AisleCodeFromscan = dataAfterScan.aisleCode;
  console.log("scanAilse ", AisleCodeFromscan)

  const handleBarcodeScanned = (barcode: string) => {
    const barcodeData = barcode;
  console.log("barcode", barcodeData)
    dispatch(scanAlisleAsync(barcodeData)).then((res:any)=>{
      console.log("------------todayy 13-12", res.payload)
     

      if(AisleCodeFromscan === aisleCode){
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
          textBody: "Barcode does not match the aisle code. Please check your barcode.",
        })
        navigation.navigate('Reconciliation')
      }
    })
  };

  const handleBackButton = () => {
    navigation.navigate("Reconciliation");
    return true;
  };
  const  namePass = "Aisle"
  return (
    <BarcodeScan onClose={handleBackButton}  onBarcodeScanned={handleBarcodeScanned}  name={namePass}/>
   )
}

export default ReconScanQr

const styles = StyleSheet.create({})