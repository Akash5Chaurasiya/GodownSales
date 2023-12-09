import { StyleSheet, Text, View , Image, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector  } from 'react-redux'
import {scanAlisleAsync} from '../../../redux/Slice/aisleSlice'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const ConfirmAisleQr = ({navigation,route}:any) => {
    
    console.log('Received route.params:', route.params);

    const { ImageSource, imageData,aisleCode, shelfCode, } = route.params|| {};
    console.log('ImageSource:', ImageSource, imageData,aisleCode, shelfCode);
  

    const succesMsg = useSelector((state: any) => state.aisle.scanaisle)
    // console.log("checking true ", succesMsg.status)
    const dispatch = useDispatch();
    const handler =()=>{
        dispatch(scanAlisleAsync(imageData)).then((res:any)=>{
          if(res.payload.status){
           Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: 'Qr assign Successfully',
            })
            navigation.navigate('assign')
          }
          else{
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "Error",
              textBody: res.payload.message,
            })
            navigation.navigate('assign')

          }
        })
        // if(succesMsg.status===true){
              
        //     Alert.alert("qr assign successfully")
        //     navigation.navigate('assign')
        // }
    }
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
        <Navbar/>
        <View>
            <Text style={{color:'#005D7F', fontSize:20, fontWeight:'700', textAlign:'center', marginTop:'10%'}}>Assign this QR Code to:</Text>

            <View style={{width:'80%', borderWidth:1, borderRadius:3, borderColor:'#DEDEDE', marginTop:'7%', justifyContent:'center', alignItems:'center', marginLeft:'10%', marginRight:'5%',paddingVertical:'10%'}}>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                <Image source={{ uri: `file://${ImageSource}` }} style={{ width:100, height:100,borderRadius:50 }} />
                <Text style={{color:'#005D7F', fontWeight:'700', fontSize:19}}>Asile No:{aisleCode}</Text>
                <Text style={{color:'#005D7F', fontWeight:'700', fontSize:19}}>Shelf No:{shelfCode}</Text>
                </View>

            </View>
            <View>
                
            </View>
            <TouchableOpacity style={{backgroundColor:'#005D7F', width:'50%',justifyContent:'center', borderRadius:5, padding:'4%', alignItems:'center', marginLeft:'27%', marginTop:'5%' }} onPress={
              handler
                }>
                <Text style={{color:'white', fontWeight:'700', textAlign:'center'}}>Assign Qr </Text>
            </TouchableOpacity>

        </View>


      
    </View>
  )
}

export default ConfirmAisleQr

const styles = StyleSheet.create({})