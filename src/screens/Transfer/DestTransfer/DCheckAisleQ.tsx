import { StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { destTranferVerificationSlipAsync} from '../../../redux/Slice/transfer'
import { TextInput } from 'react-native-paper';

const DCheckAisleQ = ({navigation, route}:any) => {
  const dispatch = useDispatch();
  const { transferId, itemId ,image,aisleId} = route.params || {};
  console.log("Dddddddddddddddddddddddddddddddddddd--t-t-t", transferId, itemId, image, aisleId)

  const imageString1 = useSelector((state: any) => state.aisle.upploadaisleImage)
  const imageString = imageString1[0];
  console.log("checkkkkeckkeckk----t-t-t-", imageString)
  const dpriceData = useSelector((state:any)=>state.transfer.TranferSqrscan)
  const dprice = dpriceData.sourcePrice
  // const requiredQty = dpriceData.destinationGodownQuantity
  // console.log("----------------------------uuupdattte", requiredQty)
  const [dquantity, setdquantity] = useState<any>()
  const [quantity , setQuantity]= useState<any>();
  const requiredQty = quantity; 
  
  console.log("dquantity ---user entered qtyy---------------",dquantity)
  console.log("pending quantity coming from apppi-----------------uuuu", quantity);

    const handleConfirm =() =>{
      if(dquantity >quantity){
        setdquantity(null)
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Warn",
          textBody: "please select vaild quantity "
        })
      }
        if (imageString && dquantity<=quantity ) {
            const dataFormat = { imageString, transferId, aisleId,dprice ,dquantity}
            console.log("newcheck------------", dataFormat)
            dispatch(destTranferVerificationSlipAsync(dataFormat)).then((res: any) => {
              setQuantity((prevQuantity:any) => {
                console.log("Previous Quantity:", prevQuantity);
                console.log("New Quantity:", res.payload.pendingQuantity);
                return res.payload.pendingQuantity;
              });
              console.log("------------", res.payload)
              if (res.payload.status && res.payload.pendingQuantity===0) {
                setdquantity(null)
              
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: res.payload.message,
                  })
                  navigation.navigate("DAisleVerification",{transferId:transferId});
                
      
              }
              else {
                setdquantity(null)
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Scan Aisle for pending Quantity",
                    textBody: res.payload.pendingQuantity||res.payload.message
                  })
        
                  navigation.navigate("DTransferAisleScan",{transferId:transferId, itemId: itemId});
      
              
              }
            })
      
          }

    }

  

  const handleQuantityChange = (text:any) => {
   
    const isValidNumber = /^\d+$/.test(text);

    // If it's a valid number or an empty string, update the state
    if (isValidNumber || text === '') {
      setdquantity(text);

      // Show warning dialog if entered quantity exceeds the required quantity
      // if (text !== '' && parseInt(text, 10) > requiredQty ) {
      //   setdquantity(null);
      //   Dialog.show({
      //     type: ALERT_TYPE.WARNING,
      //     title: 'Warning',
      //     textBody: 'Please enter a quantity equal to or less than the required quantity.',
      //   });
      // }
    }
  };

  return (
    <View style={{backgroundColor:'white', flex:1}}>
    <Navbar/>
    <Image source={{ uri: image }} style={{ width: '80%', height: '65%', marginHorizontal: '10%', borderRadius: 9, borderWidth: 4, borderColor: 'white',marginTop:'2%' }} />
    <View style={{marginHorizontal:'10%', marginTop:'2%'}}>
  
   <TextInput
              style={styles.input}
              value={dquantity}
              // onChangeText={(text) => setdquantity(text)}
              onChangeText={handleQuantityChange}
              placeholder="Enter the quantity"
              placeholderTextColor={'black'}
              keyboardType="numeric"

            />
            <Text style={styles.remainingText}>
                                    /{quantity}
                                </Text>

    </View>
  
     

    <TouchableOpacity style={{ width: '80%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 , marginLeft:'9%', marginTop:'5%'}} onPress={handleConfirm}>
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Confirm</Text>
                  </TouchableOpacity>


    <View>


    </View>
  </View>
  )
}

export default DCheckAisleQ

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    fontSize: 18, // Increase font size for larger input
    paddingVertical: 2, // Increase padding for larger input
    color:'black',
    backgroundColor:'white'
  },
  remainingText: {
    fontSize: 20,
    marginLeft: 8,
    marginRight:14,
    color: 'gray',
},
})