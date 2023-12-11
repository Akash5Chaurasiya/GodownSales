import { StyleSheet, Text, View, Linking, Image, TouchableOpacity, Alert, TextInput , Modal} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { imageUploadAisleAsync, addAisleImageAsync } from '../../../redux/Slice/aisleSlice';
import { useAuthContext } from '../../../auth/authorization/AuthGuard';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
const AssignAisleCamera = ({ navigation, route }: any) => {
  // const route: any = useRoute();
  const { authData }: any = useAuthContext();
  const userID = authData.userId
  const dispatch = useDispatch();
  const { data, aisleCode, shelfCode } = route.params
  const imageData = data

  console.log("coming imagedata", data, aisleCode, shelfCode,)
  const camera = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const devices = useCameraDevices();
  const device = devices.back;
  const [ImageSource, setImageSource] = useState<any>(null);
  const [showCamera, setShowCamera] = useState<any>(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [text, setText] = useState<any>()
  const image = useSelector((state: any) => state.purchase.purchaseQrScanData)
  console.log("image selector-------------------", image)
  const imageString1= useSelector((state: any) => state.aisle.upploadaisleImage)
  const imageString = imageString1[0];
  console.log("checkkkkeckkeckk", imageString)

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
        // const data = await result.blob();
        // console.log("------------------------------------------", data)
        setImageSource(photo.path);
        setShowCamera(false);
        setShowPhoto(true);
        console.log("------------------", photo.path);
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };
  console.log("imagesource------------------------", ImageSource)

  console.log("text", text)
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
            // Alert.alert("Upload successful");
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "warn",
              textBody: 'Enter the reason to confirm the image',
            })
            setIsVisible(true);

            // if (imageString) {
            //   const dataString = { imageString, text, aisleCode, userID }
            //   console.log("newcheck------------", dataString)
            //   dispatch(addAisleImageAsync(dataString)).then((res: any) => {
            //     console.log("------------", res.payload)
            //     if (res.payload.status) {
            //       Toast.show({
            //         type: ALERT_TYPE.SUCCESS,
            //         title: "Success",
            //         textBody: 'Successfully Upload Image',
            //       })
            //       navigation.navigate('ConfirmAisleQr', { ImageSource, imageData, aisleCode, shelfCode });

            //     }
            //     else {

            //       Toast.show({
            //         type: ALERT_TYPE.DANGER,
            //         title: "Error",
            //         textBody: res.payload.message,
            //       })
            //       // navigation.navigate('assign')
            //     }
            //   })

            // }

          } else {
            // Alert.alert("Upload failed. Response payload is empty.");
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "warn",
              textBody: "Upload failed. Response payload is empty",
            })
          }

        })
        // .catch((error: any) => {
        //   // Handle the error here
        //   console.error('Upload error:----------------------', error);
        //   Alert.alert("Upload failed. Check the console for details.");
        // });

    }
  };
  const handleRetake = () => {
    setShowCamera(true);
    setShowPhoto(false);
    setImageSource(null);
  };
  const handleImageConfirm = () => {
    if (imageString && text) {
      const dataString = { imageString, text, aisleCode, userID }
      console.log("newcheck------------", dataString)
      dispatch(addAisleImageAsync(dataString)).then((res: any) => {
        console.log("------------", res.payload)
        if (res.payload.status) {
          setIsVisible(false);
          setText(" ");
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: 'Successfully Upload Image',
          })
          navigation.navigate('ConfirmAisleQr', { ImageSource, imageData, aisleCode, shelfCode });

        }
        else {

          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: res.payload.message,
          })
          navigation.navigate('assign')
        }
      })

    }else{
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "warn",
        textBody: 'Please enter the reason',
      })

    }

  }

  if (!device) {
    console.error('Camera device not available.');
    return null; // or handle the error accordingly
  }
  // console.log('Camera device:---------------------------', device);
  console.log("ImageSource is hhherer-----------------", `file://${ImageSource}`)
  return (
    <View style={{ flex: 1 }}>
      {showPhoto && ImageSource && <Image source={{ uri: `file://${ImageSource}` }} style={{ width: '80%', height: '70%', margin: '10%', borderRadius: 5, borderWidth: 4, borderColor: 'white', }} />}
      {!showPhoto && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true}
        />
      )}
      {!showPhoto && (
        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity onPress={capturePhoto} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Capture Photo</Text>
          </TouchableOpacity>
        </View>
      )}
      {showPhoto && (
        <View style={styles.confirmButtonContainer}>
          {/* <TextInput
            style={{
              borderColor: 'gray',
              borderRadius: 8,
              borderWidth: 1, width: '70%', color: 'black', margin: '3%',
            }}
            placeholder="Enter Reason"
            value={text}
            onChangeText={(text) => setText(text)}



          /> */}
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
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter The Reason</Text>
            {/* <Text style={styles.label}>hiii</Text> */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={(text) => setText(text)}
                placeholder="Enter reason"

              />

            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.okButton,]}
                onPress={handleImageConfirm}

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



export default AssignAisleCamera

const styles = StyleSheet.create({
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,


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
    padding: 20,
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
    borderBottomWidth: 1
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 18, // Increase font size for larger input
    paddingVertical: 12, // Increase padding for larger input
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 16,
  },
})