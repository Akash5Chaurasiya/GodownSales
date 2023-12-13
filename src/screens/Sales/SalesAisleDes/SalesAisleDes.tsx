import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector , useDispatch} from 'react-redux'

import Navbar from '../../../components/navbar/Navbar'

const SalesAisleDes = ({navigation}:any) => {
  const datafrompurchase = useSelector((state:any)=>(state.aisle.scanaisle))
  console.log("dataFrom purshare", datafrompurchase)
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <Navbar/>
    <View className='m-4'>
      <Text style={{color:'black', fontWeight:'700', fontSize:22}}>Aisle Description :</Text>
    </View>
    <View >

   
    {datafrompurchase?.itemData?.length ==0 ? <Text style={{color:'#005D7F', fontWeight:'500', margin:'6%', fontSize:17}}>No item present in Aisle :)!!</Text> :<Text style={{color:'#005D7F', fontWeight:'500', margin:'6%', fontSize:17}}>willl display soon :) </Text>}
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop:'90%' }} className=' gap-2'>
      <TouchableOpacity style={{ width: '90%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 }} onPress={()=>navigation.navigate("SalesAislePhoto")}>
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: '4%', borderRadius: 9, borderWidth: 1, borderColor: '#005D7F' }} onPress={()=>navigation.navigate("SalesAisleQr")}>
        <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload another aisle</Text>
      </TouchableOpacity>


    </View>
    
  </View>
  )
}

export default SalesAisleDes

const styles = StyleSheet.create({})