
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert, BackHandler, TouchableOpacity, Text, Vibration } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { RNHoleView } from 'react-native-hole-view';
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { useAuthContext } from '../../../auth/authorization/AuthGuard';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { purchaseQrScanAsync } from '../../../redux/Slice/purchaseSlice';

interface CamProps {
  navigation: any;
  route:any
 
}


const PurchaseCamera: React.FC<CamProps> = ({ navigation,route }) => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [isFocused, setIsFocused] = useState(true); 
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS]);
  const [barcode, setBarcode] = useState<string>(''); // Provide a default value of an empty string
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const dispatch = useDispatch();
  const [torchOn, setTorchOn] = useState<any>(false);
// console.log("Ttttttttttttttttttttttttttttt", torchOn)
const flashMode = torchOn ? 'on' : 'off'; 
  const toggleFlashlight = () => {
    
    const newTorchState = !torchOn; // Toggle the torchOn state
    setTorchOn(newTorchState);
  };


  useEffect(() => {
    checkCameraPermission();
  }, []);


  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    console.log("statusss", status)
    setHasPermission(status === 'authorized');
  };

 
  const toggleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && !isScanned) {
      try {
        setIsScanned(true);
        let dataToNavigate = null; // Initialize data variable
        // const errorMessages = [];
        for (const scannedBarcode of barcodes) {
          if (scannedBarcode.rawValue && scannedBarcode.rawValue !== '') {
            const datascan = scannedBarcode.rawValue;
            console.log("---------------------------------------neww",datascan);
            setBarcode(datascan);
            console.log(scannedBarcode.rawValue);
           
            if(datascan){
              const datasplit = datascan.replace(/s\//g, '').replace(/"/g, '');
              console.log("scccc----------------------------------------------------------------", datasplit)
              const akaka = {"data":datasplit}
              dispatch(purchaseQrScanAsync(akaka)).then((res:any)=>{
                console.log("------------", res.payload)
                if(res.payload.status){
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: 'Successfully barcode scan',
                  })
                  navigation.navigate('PurchasePage')

                }
                else{
                  // Alert.alert("check your barcode !!")
                  // cons
  
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Error",
                    textBody: res.payload.message,
                  })
                  navigation.navigate('Purchase')
                }
              })
            }
           
            
          }
        }
      
      } catch (error) {

        console.error(error);
        navigation.navigate("Purchase");
        Alert.alert('An unexpected error occurred. Please try again later.');
      }
    }
  };


  useEffect(() => {
    toggleActiveState();
  }, [barcodes]);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  
  const handleBackButton = () => {
    navigation.navigate("Purchase");
    return true;
  };
// console.log("haspesmm", hasPermission)
  return (
    device != null &&
    hasPermission && (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1,
          }}
          onPress={() => handleBackButton()}
        >

          {/* <XMarkIcon color="red" fill="white" size={42} /> */}
          <Feather
            name="x"
            size={18}
            color={'red'}
          // style={styles.searchIcon}
          />

        </TouchableOpacity>
       
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={!isScanned}
          frameProcessor={frameProcessor}
          frameProcessorFps="auto"
          audio={false}
          enableZoomGesture
          
          torch= {flashMode}
        />
         <View className='flex flex-row' style={{alignItems:'center', justifyContent:'space-around', marginTop:'30%',zIndex: 2000}}>
        <Text style={{ color: "white", fontWeight: '600',  fontSize: 22, zIndex: 2000 }}>Scan QR Code Of Purchase </Text>
        <View >
          <TouchableOpacity onPress={toggleFlashlight } style={{flexDirection:'column', alignItems:'center',zIndex: 2000,}}>
            <Text style={{color:'white', fontWeight:'500'}}>Flash Light</Text>
          <Feather
                name={torchOn ? 'zap' : 'zap-off'}
             
                size={22}
                color={'white'}
              />
          </TouchableOpacity>
        </View>
        </View>
       

       {/* <View style={{justifyContent:'center', alignItems:'center',top:'20%' }}>


<Text style={{color:'white', fontSize:25, fontWeight:'800', }}>Scan QR Code Of Purchase</Text>
</View> */}

      
        <RNHoleView
          holes={[
            {
              x: widthPercentageToDP('10.5%'),
              y: heightPercentageToDP('25%'),
              width: widthPercentageToDP('80%'),
              height: heightPercentageToDP('30%'),
              borderRadius: 10,
            },
          ]}
          style={styles.rnholeView}
        />
      </>
    )
  );
}

export default PurchaseCamera

const styles = StyleSheet.create({
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex:1000
  },
  corner: {
    position: 'absolute',
    backgroundColor: 'white',
  },

})









