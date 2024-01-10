import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import Navbar from '../../../components/navbar/Navbar'

const SalesAisleDes = ({ navigation }: any) => {
  const datafromApi = useSelector((state: any) => (state.aisle.scanaisle))
  const datafromScanSaleslip = useSelector((state: any) => (state.sales.SalesQrScan))
  const itemId = datafromScanSaleslip.itemData[0].item._id;
  const dataList = datafromApi?.itemData;

  const isItemPresent = dataList?.find((item: any) => item.item._id === itemId);
  // return (
  //   <View style={{flex:1, backgroundColor:'white'}}>
  //   <Navbar/>
  //   <View className='m-4'>
  //     <Text style={{color:'black', fontWeight:'700', fontSize:22}}>Aisle Description :</Text>
  //   </View>
  //   <View >


  //   {datafromScanaisle?.itemData?.length ==0 ? <Text style={{color:'#005D7F', fontWeight:'500', margin:'6%', fontSize:17}}>No item present in Aisle :)!!</Text> :<Text style={{color:'#005D7F', fontWeight:'500', margin:'6%', fontSize:17}}>willl display soon :) </Text>}
  //   </View>
  //   <View style={{ flexDirection: 'column', alignItems: 'center', marginTop:'90%' }} className=' gap-2'>
  //     <TouchableOpacity style={{ width: '90%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 }} onPress={()=>navigation.navigate("SalesAislePhoto")}>
  //       <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Confirm</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: '4%', borderRadius: 9, borderWidth: 1, borderColor: '#005D7F' }} onPress={()=>navigation.navigate("SalesAisleQr")}>
  //       <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload another aisle</Text>
  //     </TouchableOpacity>


  //   </View>

  // </View>
  // )
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Navbar />
      <View className='m-4'>
        <Text style={{ color: 'black', fontWeight: '700', fontSize: 22 }}>Aisle Description :</Text>
      </View>

      <View  >




        {isItemPresent ?
          (
            <View>

              <View style={styles.view1}>
                <View className='flex flex-row justify-between '>
                  <Text style={styles.bar}>Aisle Name: {datafromApi?.aisleName}</Text>
                  <Text style={styles.bar}>Aisle Code: {datafromApi?.aisleCode}</Text>
                </View>

                <View>
                  <FlatList
                    data={dataList}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ maxHeight: 340 }}
                    renderItem={({ item }) => {
                      const lastEntry = item.item.changeLog[item.item.changeLog.length - 1];

                      const lastDate = lastEntry ? new Date(lastEntry.date).toLocaleDateString() : null;

                      return (
                        <View style={styles.card}>
                          <View className='flex flex-row justify-between'>
                            <View className='flex flex-row '>
                              <Image source={{ uri: item.item.images[0] }} style={styles.photo} />
                              <View className='flex flex-col'>

                                <View className='flex flex-row ml-1'>

                                  <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 16, }}>Quantity Present: </Text>
                                  <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>{item.quantity.toFixed(2)}</Text>
                                </View>
                                <View className='flex flex-row ml-1'>

                                  <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 16, }}>Price: </Text>
                                  <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>{item.price}</Text>
                                </View>
                              </View>
                            </View>

                          </View>

                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 18 }}> {item.item.name}</Text>


                            <View className='flex flex-col'>
                              <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 13 }}>Last Updated</Text>
                              <Text style={{ color: 'black', fontWeight: '600', fontSize: 13 }}>{lastDate}</Text>

                            </View>
                          </View>



                        </View>
                      );
                    }}
                  />




                </View>



              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center' }} className='gap-2  mt-2' >
                <TouchableOpacity style={{ width: '90%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 }} onPress={() => navigation.navigate("SalesAislePhoto")}>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: '4%', borderRadius: 9, borderWidth: 1, borderColor: '#005D7F' }} onPress={() => navigation.navigate("SalesAisleQr")}>
                  <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload another aisle</Text>
                </TouchableOpacity>


              </View>
            </View>
          )
          :
          (
            <View>
              <Text>item is not same in aisle please check again</Text>

              {navigation.navigate("SalesItemDes")
              }
              {Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: "Please check:)Item is not same in aisle ",
              })}

            </View>
          )}





      </View>


    </View >




  )
}

export default SalesAisleDes

const styles = StyleSheet.create({
  view1: {
    padding: '3%',
    marginHorizontal: '6%',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
    marginTop: '1%',
    // width: '98%',
    height: '70%',
    // flexDirection: 'column',
  },
  bar: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    // marginLeft:'5%', 
    backgroundColor: 'black',
    borderRadius: 10,
    // textAlign: 'center',
    paddingHorizontal: '2%',
    paddingVertical: 4

  },
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 10,
    padding: 13,
    elevation: 2,
    // flexDirection:'row'
    // borderColor: 'black',
    // borderWidth: 0.4
  },
  photo: {

    width: 80,
    height: 80,
    borderRadius: 10,
    margin: '1%'
  },
})