import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../../auth/authorization/AuthGuard';
import { scanAlisleAsync } from '../../../redux/Slice/aisleSlice';
import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import BarcodeScan from '../../../components/BarcodeScan/BarcodeScan';


const SalesAisleQr = ({navigation}:any) => {
  const { authData}:any = useAuthContext();
  const dispatch = useDispatch();
  
  const handleBarcodeScanned = (barcode: string) => {
 
  const barcodeData = barcode;
  console.log("aisle barcode",barcode)
  dispatch(scanAlisleAsync(barcodeData)).then((res:any)=>{
    if(res.payload.status){
     Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: 'Aisle Qr scan Successfully',
      })
      navigation.navigate('SalesAisleDes')
    }
    else{
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: res.payload.message,
      })
      navigation.navigate('SalesItemDes')

    }
  })
  };

  const handleBackButton = () => {
    navigation.navigate("SalesItemDes");
    return true;
  };
  const  namePass = "Aisle"
  return (
    <BarcodeScan onClose={handleBackButton}  onBarcodeScanned={handleBarcodeScanned} name={namePass} />
  
  )
}

export default SalesAisleQr

const styles = StyleSheet.create({})



//scan qr of aisle'