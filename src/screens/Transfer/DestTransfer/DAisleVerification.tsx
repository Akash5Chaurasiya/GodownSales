import { StyleSheet, Text, View, Linking, Image, TouchableOpacity, Alert, TextInput, Modal } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../../auth/authorization/AuthGuard';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { imageUploadAisleAsync } from '../../../redux/Slice/aisleSlice';
import { destTransferaddImageAsync} from '../../../redux/Slice/transfer'
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Feather from 'react-native-vector-icons/Feather';

const DAisleVerification = ({navigation, route}:any) => {
  const { transferId} = route.params || {};
  console.log("Dddddddddddddddddddddddddddddddddddd", transferId,)
 

  const dispatch = useDispatch();

const camera = useRef<any>(null);

const devices = useCameraDevices();
const device = devices.back;
const [isVisibleQuantity, setIsVisibleQuantity] = useState(false);
const [ImageSource, setImageSource] = useState<any>(null);
const [showCamera, setShowCamera] = useState<any>(true);
const [showPhoto, setShowPhoto] = useState(false);
const [torchOn, setTorchOn] = useState<any>(false);
// console.log("Ttttttttttttttttttttttttttttt", torchOn)
const flashMode = torchOn ? 'on' : 'off'; 
  const toggleFlashlight = () => {
    
    const newTorchState = !torchOn; // Toggle the torchOn state
    setTorchOn(newTorchState);
  };
// const [text, setText] = useState<any>()
const [textQuantity, setTextQuantity] = useState<any>()
// const image = useSelector((state: any) => state.purchase.purchaseQrScanData)
// console.log("image selector-------------------", image)
const imageString1 = useSelector((state: any) => state.aisle.upploadaisleImage)
const imageString = imageString1[0];

console.log("checkkkkeckkeckk", imageString)

// const aisleCodeData = useSelector((state: any) => state.aisle.scanaisle)
// const aisleCode = aisleCodeData.aisleCode;
// const aisleID = aisleCodeData._id;
// console.log("------------tttttttttttttttttttt", aisleID)


  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
  }, []);
  const capturePhoto = async () => {

    try {
      if (camera.current !== null && showCamera) {
        const photo = await camera.current.takePhoto({});
        const result = await fetch(`file://${photo.path}`)
        setImageSource(photo.path);
        setShowCamera(false);
        setShowPhoto(true);
        console.log("------------------", photo.path);
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };


  const handleConfirm = () => {
    if (ImageSource) {
      const formData = new FormData();
      formData.append('image', {
        uri: `file://${ImageSource}`,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
     
      console.log("formdata-------------------------", formData);
      dispatch(imageUploadAisleAsync(formData))
        .then((response: any) => {

          console.log('Upload response:----------------------', response);
          if (response.payload && response.payload.length > 0) {
         setIsVisibleQuantity(true) 
           
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "warn",
              textBody: 'Are you sure :)if yess, confirm again',
            })



          } else {
           
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "warn",
              textBody: "Upload failed. Response payload is empty",
            })

          }

        })
     

    }
  };
  const handleRetake = () => {
    setShowCamera(true);
    setShowPhoto(false);
    setImageSource(null);
  };

  const handleImageConfirmQuantity = () => {
    if (imageString ) {
      const dataFormat = { imageString, transferId,}
      console.log("newcheck------------", dataFormat)
      dispatch(destTransferaddImageAsync(dataFormat)).then((res: any) => {
        console.log("------------", res.payload)
        if (res.payload.status) {
        console.log("cclickkkk")
          setIsVisibleQuantity(false);
          // setTextQuantity(" ");
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: 'Successfully VeriFied',
          })

          navigation.navigate("STransfer");


        }
        else {

          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: res.payload.message,
          })
          navigation.navigate("STransfer");
        }
      })

    }

  }
  if (!device) {
    // console.error('Camera device not available.');
    return null; 
  }
  return (
    <View style={{ flex: 1 }}>
    {showPhoto && ImageSource && <Image source={{ uri: `file://${ImageSource}` }} style={{ width: '80%', height: '70%', margin: '10%', borderRadius: 5, borderWidth: 4, borderColor: 'white', }} />}
    {!showPhoto && (
      <>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true}
          torch= {flashMode}
          
        /></>
    )}
    {!showPhoto && (
      <>
       <View className='flex flex-row' style={{alignItems:'center', justifyContent:'space-around', marginTop:'30%'}}>
         <Text style={{ color: "white", fontWeight: '600',  fontSize: 22,  }}>Capture Verification Photo</Text>
         <View >
           <TouchableOpacity onPress={toggleFlashlight } style={{flexDirection:'column', alignItems:'center'}}>
             <Text style={{color:'white', fontWeight:'500'}}>Flash Light</Text>
           <Feather
                 name={torchOn ? 'zap' : 'zap-off'}
              
                 size={22}
                 color={'white'}
               />
           </TouchableOpacity>
         </View>
         </View>
        {/* <Text style={{ color: "white", fontWeight: '600', justifyContent: 'center', fontSize: 22, margin: '25%' }}>Capture Verification Photo</Text> */}
        <View style={styles.confirmButtonContainer}>

          <TouchableOpacity onPress={capturePhoto} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Capture Photo</Text>
          </TouchableOpacity>
        </View>
      </>
    )}
    {showPhoto && (
      <View style={styles.confirmButtonContainer}>
      
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={handleRetake}
            style={styles.confirmRButton}
          >
            <Text style={{ ...styles.confirmRButtonText, }}>Retake</Text>
            <Feather
              name="repeat"
              size={18}
              color={'#005D7F'}
              style={{ marginLeft: '2%' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={{ ...styles.confirmButton, }}
          >
            <Text style={styles.confirmButtonText}>Confirm </Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
   <Modal
      visible={isVisibleQuantity}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsVisibleQuantity(false)}
    >
      <View style={styles.modalContainer1}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Are you sure :</Text>
          {/* <Text style={styles.label}>hiii</Text> */}
          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={textQuantity}
              onChangeText={(text) => setTextQuantity(text)}
              placeholder="Enter the quantity"

            />

          </View> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsVisibleQuantity(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.okButton,]}
              onPress={handleImageConfirmQuantity}

            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal> 
    

  </View>
  )
}

export default DAisleVerification

const styles = StyleSheet.create({
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,


  },
  confirmRButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    backgroundColor: '#005D7F',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  confirmButtonText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  confirmRButtonText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#005D7F',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',

  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    margin: '5%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
  },
  cancelButton: {
    backgroundColor: '#005D7F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  okButton: {
    backgroundColor: '#005D7F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // modalContent: {
  //     width: '80%',
  //     backgroundColor: 'white',
  //     borderRadius: 8,
  //     padding: 16,
  // },
  modalTitle: {
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    borderBottomWidth: 1, 
  
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 18, // Increase font size for larger input
    paddingVertical: 12, // Increase padding for larger input
    color:'black'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 16,
  },
})