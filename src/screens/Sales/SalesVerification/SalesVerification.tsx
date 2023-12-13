import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AislePhotoPage from '../../../components/AislePhotoPage/AislePhotoPage'

const SalesVerification = ({navigation}:any) => {
  const succesNavigate = "Sales";
  const BackName = "Sales";
  const Verification= "Verification";
  return (
    <AislePhotoPage succesNavigate ={succesNavigate} BackName={BackName} navigation= {navigation} capture={Verification} />
    
  )
}

export default SalesVerification

const styles = StyleSheet.create({})