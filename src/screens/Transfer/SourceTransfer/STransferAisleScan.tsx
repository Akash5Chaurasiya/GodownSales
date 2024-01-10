import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScan from '../../../components/BarcodeScan/BarcodeScan';
import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { scanAlisleAsync } from '../../../redux/Slice/aisleSlice';
const STransferAisleScan = ({navigation, route}:any) => {
  const {transferId,itemId} = route.params || {};
  console.log("transefer id on aisle page -------------------", transferId)
  console.log("itemmmmr id on aisle page -------------------", itemId)
  const dispatch = useDispatch();
  
  const handleBarcodeScanned = (barcode: string) => {
   
  const barcodeData = barcode;
  dispatch(scanAlisleAsync(barcodeData)).then((res:any)=>{
    if(res.payload.status){
     Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: 'Aisle Qr scan Successfully',
      })
      navigation.navigate('SAisleDes', {transferId:transferId, itemId: itemId})
    }
    else{
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: res.payload.message,
      })
      navigation.navigate('SourceGodownDes')

    }
  })
  };

  const handleBackButton = () => {
    navigation.navigate("SourceGodownDes");
    return true;
  };
  const  namePass = "Aisle"
  return (
   <BarcodeScan onClose={handleBackButton}  onBarcodeScanned={handleBarcodeScanned} name={namePass}/>
  )
}

export default STransferAisleScan

const styles = StyleSheet.create({})


// designatio -> add item 
// source -> remove item 
// // 