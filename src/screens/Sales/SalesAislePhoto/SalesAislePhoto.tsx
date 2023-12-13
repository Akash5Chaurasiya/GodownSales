import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AislePhotoPage from '../../../components/AislePhotoPage/AislePhotoPage'

const SalesAislePhoto = ({navigation}:any) => {
  const succesNavigate = "SalesVerification";
  const BackName = "Sales";
  const Verification = "Aisle Photo"
  return (
   
   <AislePhotoPage succesNavigate ={succesNavigate} BackName={BackName} navigation= {navigation} capture={Verification}/>
  )
}

export default SalesAislePhoto

const styles = StyleSheet.create({})