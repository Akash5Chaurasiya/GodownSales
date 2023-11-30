import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, AppState } from 'react-native'
import React, { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from '../components/navbar/Navbar'
import { TouchableRipple } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather';
import { Camera } from 'react-native-vision-camera';
import LazzyComp from './lazzyComp';

const Dashboard = ({navigation}:any) => {
    const checkCameraPermission = async () => {
        let status = await Camera.getCameraPermissionStatus();
        if (status !== 'authorized') {
            await Camera.requestCameraPermission();
            status = await Camera.getCameraPermissionStatus();
            if (status === 'denied') {
                Alert.alert(
                    'You will not be able to scan if you do not allow camera access',
                );
            }
        }
    };
    console.log("appstate---", AppState)
    useEffect(() => {
        checkCameraPermission();
    }, []);
    return (
        <View style={{ backgroundColor: '#FAFAFA', flex: 1 }}>
            <View>
                <Navbar />
            </View>
            <View style={{ backgroundColor: '#FAFAFA', }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, alignContent: 'center' }}>
                    <TouchableOpacity style={styles.Purchase} onPress={()=>navigation.navigate('Purchase')}>
                        <Feather
                            name='shopping-cart'
                            size={18}
                            color={'black'}
                            style={{ marginLeft: 35 }}
                        />
                        <Text style={styles.text}>Purchase</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Sales}>
                        <Feather
                            name='bookmark'
                            size={18}
                            color={'black'}
                            style={{ marginLeft: 40 }}
                        />
                        <Text style={styles.text}>Sales</Text>
                    </TouchableOpacity>
                </View>

            </View>
         
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    Purchase: {
        // borderWidth: 1,
        paddingVertical: 20,
        backgroundColor: '#E2F6F7',
        flexDirection: 'row',
        width: '35%',
        borderRadius: 50,
        elevation: 4

    },
    Sales: {
        // borderWidth: 1,
        paddingVertical: 20,
        backgroundColor: '#E0F3EE',
        flexDirection: 'row',
        width: '35%',
        borderRadius: 50,
        elevation: 4
    },
    text: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 19.46,
        textAlignVertical: 'center',
        textAlign: 'center',
        marginLeft: 8
    }
})