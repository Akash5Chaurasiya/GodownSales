import { StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { sourceTranferVerificationSlipAsync } from '../../../redux/Slice/transfer'
const SCheckAisleQ = ({navigation, route}:any) => {
    const dispatch = useDispatch();
    const { transferId, itemId ,image,aisleId} = route.params || {};
    console.log("Dddddddddddddddddddddddddddddddddddd--t-t-t", transferId, itemId, image, aisleId)
    const imageString1 = useSelector((state: any) => state.aisle.upploadaisleImage)
    const imageString = imageString1[0];
    console.log("checkkkkeckkeckk----t-t-t-", imageString)
    const handleConfirm =() =>{
        if (imageString ) {
            const dataFormat = { imageString, transferId, aisleId}
            console.log("newcheck------------", dataFormat)
            dispatch(sourceTranferVerificationSlipAsync(dataFormat)).then((res: any) => {
              console.log("------------", res.payload)
              if (res.payload.status && res.payload.pendingQuantity===0) {

              
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: res.payload.message,
                  })
                  navigation.navigate("SAisleVerification",{transferId:transferId});
      
              }
              else {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Scan Another Aisle for pending Quantity",
                    textBody: res.payload.pendingQuantity.toFixed(2)
                  })
        
                  navigation.navigate("STransferAisleScan",{transferId:transferId, itemId: itemId});
      
               
              }
            })
      
          }

    }
  return (
    <View style={{backgroundColor:'white', flex:1}}>
      <Navbar/>
      <Image source={{ uri: imageString }} style={{ width: '80%', height: '60%', margin: '10%', borderRadius: 9, borderWidth: 4, borderColor: 'white', }} />
       

      <TouchableOpacity style={{ width: '80%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 , marginLeft:'9%'}} onPress={handleConfirm}>
                      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Confirm</Text>
                    </TouchableOpacity>


      <View>


      </View>
    </View>
  )
}

export default SCheckAisleQ

const styles = StyleSheet.create({})