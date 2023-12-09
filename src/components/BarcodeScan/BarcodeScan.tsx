
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert, BackHandler, TouchableOpacity, Text, Vibration } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { RNHoleView } from 'react-native-hole-view';
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';



interface CameraProps {
    onBarcodeScanned: (barcode: string) => void;
    onClose: () => void;
    id?: string;//optionsl ;
    name?: string;//options;
}

const BarcodeScan: React.FC<CameraProps> = ({ onBarcodeScanned, onClose,id , name }) => {
    const devices = useCameraDevices();
    const device = devices.back;
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
    useEffect(() => {
        toggleActiveState();
    }, [barcodes]);

    const toggleActiveState = async () => {

        for (const scannedBarcode of barcodes) {
            if (scannedBarcode.rawValue && scannedBarcode.rawValue !== '') {
                console.log("on comman page", scannedBarcode.rawValue)
                onBarcodeScanned(scannedBarcode.rawValue);
            }
        }
    };

    const handleBackButton = () => {
        onClose();
        return true;
    };


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);

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
<View style={{justifyContent:'center', alignItems:'center',top:'20%' }}>


<Text style={{color:'white', fontSize:25, fontWeight:'800', }}>Scan QR Code Of {name}</Text>
</View>

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
    )
  
};

export default BarcodeScan

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