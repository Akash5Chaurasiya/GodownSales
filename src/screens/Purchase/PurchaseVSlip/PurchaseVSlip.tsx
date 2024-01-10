import { StyleSheet, Text, View,FlatList,TouchableOpacity, Image , RefreshControl} from 'react-native'
import React , {useEffect, useState}from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import FlatlistComp from '../../../components/FlatlistComp/FlatlistComp'
import {getAllPurchaseSlipAsync} from '../../../redux/Slice/purchaseSlice'
import Feather from 'react-native-vector-icons/Feather';
const PurchaseVSlip = ({navigation}:any) => { 
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const purData = useSelector((state:any)=> state.purchase.purchaseSlip)
  console.log("pppp", purData)
  const completed  = purData?.filter((s:any)=>(s.status ==="complete"&& s.verify === false))
  // item => item.status === "complete" && item.verify === false);
  console.log("completed slippp------------", completed)
  const photo = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(getAllPurchaseSlipAsync())
    // await completed
    setRefreshing(false);
};
useEffect(() => {
  dispatch(getAllPurchaseSlipAsync());
}, [])



  return (
    <View style={{flex:1, backgroundColor:'white'}}>
        <Navbar/>
        <View style={{margin:'3%' ,flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
          <Text className='text-center text-xl font-bold m-3 text-black underline'>Completed slip for Verification</Text>
          <TouchableOpacity onPress={() => navigation.navigate("PurchaseVerficationScan")}>
            <Feather
              name="camera"
              size={25}
              color={'black'}
              style={{ textAlignVertical: 'center', alignItems: 'center', }}
            /></TouchableOpacity>
            
        </View>
        <View style={{ marginVertical: '1%' }}>
          <FlatList
            style={{ maxHeight: 550 }}
            data={completed}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          
            renderItem={({item }:any) => (
              <FlatlistComp
              photo={photo}
              qrCode={item.qrCode}
              numberName ={"Purchaser Id"}
              dateTime={item.createdAt}
              lastActiveTime = {item.activeTime}
              status={item.status}
              productNumber={item._id}
              // movingPage = "PurchaseVerficationScan"
              navigation={navigation}

            />
              
            )}
          />

        </View>


    </View>
    
  )
}

export default PurchaseVSlip

const styles = StyleSheet.create({
 
})