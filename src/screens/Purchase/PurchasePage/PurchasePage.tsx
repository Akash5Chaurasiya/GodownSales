import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useSelector } from 'react-redux'

const PurchasePage = () => {
  const datafromApi = useSelector((state:any)=>state.purchase.purchaseQrScanData)
  console.log("pursadeS", datafromApi)
  return (

    <View style={styles.card}>
      <Navbar />
      <View style={{ maxHeight: 500, borderWidth: 0.5, height: '70%', margin: '5%', borderRadius: 8, borderColor: '#878787' }}>
        <View style={{ flexDirection: 'row', marginTop: '8%', marginHorizontal: '4%' }}>

          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.photo} />
          <View className='flex flex-col ml-3'>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#172B4D' }}>07/10/2023</Text>
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#005D7F' }}>Same Mahajan</Text>

          </View>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#172B4D' }}>02.00pm</Text>

          <Text className='ml-2 bg-blue-200 w-10 h-5 rounded-md font-extrabold text-black text-center'>IRON</Text>


        </View>

        <View className='flex flex-row justify-between mx-5'>
          <View className='flex flex-col justify-center'>
            <Text className='text- text-base font-semibold text-[#005D7F]'>Purchase Number</Text>
            <Text className='text- text-base font-normal text-[#172B4D]'>000000000000000</Text>
          </View>
          <View className='flex flex-col justify-center'>
            <Text className='text- text-base font-semibold text-[#005D7F]'>Bill Number</Text>
            <Text className='text- text-base font-normal text-[#172B4D]'>0193456</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#B6E7EC',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            margin: '6%',
            borderBottomWidth: 3
          }}
        />

        <View>
          <TouchableOpacity style={{width:'90%', margin:'6%'}}>
            <Text className='font-semibold text-[#005D7F] text-lg'>Raw Marteial </Text>
            <View className='flex flex-row gap-1 justify-around my-3 '>
            <View>
              <Text>M code</Text>
              <Text>12345</Text>
            </View>
            <View>
              <Text>Due DATE</Text>
              <Text>12:02:2023</Text>
            </View>
            <View>
              <Text>Total Amount</Text>
              <Text>50000</Text>
            </View>
            </View>
          </TouchableOpacity>

        </View>



      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }} className=' gap-2'>
        <TouchableOpacity style={{ width: '90%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 }}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload -</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: '4%', borderRadius: 9, borderWidth: 1, borderColor: '#005D7F' }}>
          <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload another aisle</Text>
        </TouchableOpacity>


      </View>




    </View>
  )
}

export default PurchasePage

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1
  },
  photo: {

    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },

})