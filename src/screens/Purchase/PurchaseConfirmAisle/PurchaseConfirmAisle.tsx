import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const PurchaseConfirmAisle = () => {

    const datafrompurchase = useSelector((state:any)=>(state.aisle.scanAlisleAsync))
    console.log("dataFrom purshare", datafrompurchase)
  return (
    <View>
      <Text>PurchaseConfirmAisle</Text>
    </View>
  )
}

export default PurchaseConfirmAisle

const styles = StyleSheet.create({})