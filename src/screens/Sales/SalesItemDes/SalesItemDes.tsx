import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DescriptionPage from '../../../components/DescriptionPage/DescriptionPage'
import { useSelector } from 'react-redux'

const SalesItemDes = ({navigation}:any) => {
  const dataFromApi = useSelector((state:any)=>state.sales.SalesQrScan)

  console.log("data frm appi-----", dataFromApi.itemData[0])

  return (
    // <View><Text>hii</Text></View>

 <DescriptionPage
 time={dataFromApi?.createdAt} 
 status={dataFromApi.status}
 godownName ={dataFromApi?.godown?.godownName}
 Number={dataFromApi?.salesOrder?.orderNumber} 
 itemName={dataFromApi.itemData[0]?.item?.name}
  qty={dataFromApi.itemData[0]?.quantity} 
  price={dataFromApi?.itemData[0]?.price}
  code={dataFromApi?.itemData[0]?.item?.HSNCode}
   navigation={navigation}
    screenName="SalesAisleQr"
  
  />
    
  )
}

export default SalesItemDes

const styles = StyleSheet.create({})