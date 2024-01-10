import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AislePhotoPage from '../../../components/AislePhotoPage/AislePhotoPage';
import transfer from '../../../redux/Slice/transfer';

const SAislePhoto = ({navigation, route}:any) => {
  const {transferId,itemId,aisleId} = route.params || {};
  console.log("aisle photo capturing--", transferId, itemId)
  const succesNavigate = "SCheckAisleQ";
  const BackName = "SAisleDes";
  const Verification = "Aisle Photo"
  return (
    <AislePhotoPage succesNavigate ={succesNavigate} BackName={BackName} navigation= {navigation} capture={Verification} transferId={transferId}
    itemId={itemId} aisleId={aisleId}/>
  )
}

export default SAislePhoto

const styles = StyleSheet.create({})