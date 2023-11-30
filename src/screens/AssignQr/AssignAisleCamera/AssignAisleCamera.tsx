import { StyleSheet, Text, View , Linking, Image, TouchableOpacity} from 'react-native'
import React, {useEffect, useState,useRef} from 'react'
import { Camera , useCameraDevices} from 'react-native-vision-camera';
import { useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const AssignAisleCamera = ({navigation,route}:any) => {
  // const route: any = useRoute();
  const { data,aisleCode, shelfCode} = route.params
  const imageData = data 

  console.log("coming imagedata", data,aisleCode, shelfCode,)
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back; 
  const[ImageSource, setImageSource]= useState<any>(null);
  const [showCamera, setShowCamera] = useState<any>(true);
  const [showPhoto, setShowPhoto] = useState(false);

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
        console.log("------------------",photo.path);
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };
 
  
  const handleConfirm = () => {
    if (ImageSource) {
        // imageUpload(ImageSource);

        navigation.navigate('ConfirmAisleQr', {ImageSource, imageData,aisleCode, shelfCode,})

    }
};
const handleRetake = () => {
     setShowCamera(true);
    setShowPhoto(false);
    setImageSource(null);
};

if (!device) {
  console.error('Camera device not available.');
  return null; // or handle the error accordingly
}
console.log('Camera device:---------------------------', device);
  console.log("ImageSource is hhherer-----------------", ImageSource)
  return (
     <View style={{ flex: 1 }}>
     {showPhoto && ImageSource && <Image source={{ uri: `file://${ImageSource}` }} style={{ width:'80%', height:'70%', margin:'10%', borderRadius:5, borderWidth:4, borderColor:'white',}} />}
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
             <View style={styles.buttonRow}>
                 <TouchableOpacity
                     onPress={handleRetake}
                     style={styles.confirmRButton}
                 >
                     <Text style={{...styles.confirmRButtonText,}}>Retake</Text>
                     <Feather
                                name="repeat"
                                size={18}
                                color={'#005D7F'}
                                style={{marginLeft:'2%'}}
                            />
                 </TouchableOpacity>
                 <TouchableOpacity
                     onPress={handleConfirm}
                     style={{ ...styles.confirmButton,  }}
                 >
                     <Text style={styles.confirmButtonText}>Confirm </Text>
                 </TouchableOpacity>
             </View>
         </View>
     )}
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
    flexDirection:'row', 
    justifyContent:'center',
    alignItems:'center'
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
    fontSize:18,
    color: '#005D7F',
    textAlign: 'center',
},
buttonRow: {
    flexDirection: 'row',

},
})