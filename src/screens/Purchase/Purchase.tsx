import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { SearchBar } from 'react-native-screens'
import SearchComponent from '../../components/searchBar/SearchBar'
import FlatlistComp from '../../components/FlatlistComp/FlatlistComp'
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch , useSelector } from 'react-redux'
import { getAllPurchaseSlipAsync } from '../../redux/Slice/purchaseSlice'


const Purchase = ({navigation}:any) => {
  const dispatch = useDispatch();
  const photo ='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

  useEffect(()=>{
     dispatch(getAllPurchaseSlipAsync());
  },[])

const purchaseList = useSelector((state:any)=>state.purchase.purchaseSlip)
console.log("----------------------------editititi", purchaseList)



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <Navbar />
      <View>
        <Text className='text-center text-xl font-extrabold m-5 text-black'>Choose Purchaser Number</Text>
        <View style={{ marginHorizontal: '4%', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
          <SearchComponent />
          <TouchableOpacity onPress={()=>navigation.navigate("PurchaseCamera")}>
          <Feather
        name="camera"
        size={25}
        color={'black'}
        style={{ textAlignVertical:'center', alignItems:'center', }}
      /></TouchableOpacity>

        </View>

       

        <View style={{ marginVertical: '1%' }}>
          <FlatList
            style={{ maxHeight: 550 }}
            data={purchaseList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
             
              <FlatlistComp 
              photo={photo}
              qrCode={item.qrCode}

              dateTime= {item.createdAt}
              status={item.status}
              productNumber={item.purchaseOrder}
              // productName={item.productName}
              
              />
            )}
          />

        </View>



      </View>
    </View>
  )
}

export default Purchase

const styles = StyleSheet.create({
  
})