import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert, BackHandler, TouchableOpacity, Text, Vibration } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { RNHoleView } from 'react-native-hole-view';
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {scanAlisleAsync} from '../../../redux/Slice/aisleSlice'
import { useAuthContext } from '../../../auth/authorization/AuthGuard';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

interface CamProps {
  navigation: any;
  route:any
 
}


const ScanPurchaseAisle: React.FC<CamProps> = ({ navigation,route }) => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [torchOn, setTorchOn] = useState(false);
  const [isFocused, setIsFocused] = useState(true); 
  // const route: any = useRoute();
  // const id:any = route.params
//   const { aisleId, aisleCode, shelfCode } = route.params;
  const { authData}:any = useAuthContext();
//   const userID = authData.userId
//   const a = aisleCode
//   const b = shelfCode
//   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", a, b)

//   console.log("userId", authData.userId)
 
//   console.log("idd on scan page",aisleId, aisleCode, shelfCode, )

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS]);
  const [barcode, setBarcode] = useState<string>(''); // Provide a default value of an empty string
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    checkCameraPermission();
  }, []);
  
  
 

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    console.log("statusss", status)
    setHasPermission(status === 'authorized');
  };

//  const successcoming = useSelector((state: any) => state.aisle.assignaisle)

// console.log("successs", successcoming.status)
  const toggleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && !isScanned) {
      try {
        setIsScanned(true);
        let dataToNavigate = null; // Initialize data variable
        // const errorMessages = [];
        for (const scannedBarcode of barcodes) {
          if (scannedBarcode.rawValue && scannedBarcode.rawValue !== '') {
            const datascan = scannedBarcode.rawValue;
            console.log("---------------------------------------",datascan);
            setBarcode(scannedBarcode.rawValue);
            console.log("scanedded data",scannedBarcode.rawValue, datascan);
           

            // const datapassing = { aisleId, datascan,userID }
            // console.log("---------------------->", datapassing)
            dispatch(scanAlisleAsync(datascan)).then((res:any)=>{
              if(res.payload.status){
               Toast.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Success",
                  textBody: ' Aisle Qr scan Successfully"',
                })
                navigation.navigate('PurchaseConfirmAisle')
              }
              else{
                Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: "Error",
                  textBody: res.payload.message,
                })
                navigation.navigate('PurchasePage')
    
              }
            })

          
            
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
    navigation.navigate("PurchasePage");
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
        />


      
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

export default ScanPurchaseAisle

const styles = StyleSheet.create({
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  corner: {
    position: 'absolute',
    backgroundColor: 'white',
  },

})









