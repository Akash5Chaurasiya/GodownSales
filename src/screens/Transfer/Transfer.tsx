

import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View, Modal, Touchable } from 'react-native';
import type { EasingFunction } from 'react-native';
import Navbar from '../../components/navbar/Navbar';
 
const Transfer = ({ navigation }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const modalOpacity = useRef(new Animated.Value(0)).current;
    useFocusEffect(() => {
        setModalVisible(true);
    })
    useEffect(() => {
        setModalVisible(true);
    }, [])
    const animateModal = (easing: EasingFunction) => {
        modalOpacity.setValue(0);
        Animated.timing(modalOpacity, {
            toValue: 1,
            duration: 1200,
            easing,
            useNativeDriver: true,
        }).start();
    };
    const modalSize = modalOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 80],
    });
    const modalAnimatedStyles = [
        styles.modalBox,
        {
            opacity: modalOpacity,
            transform: [{ scaleX: modalSize }, { scaleY: modalSize }],
        },
    ];
    return (
      <>
      <Navbar/>
    
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '60%' }}>
            <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{ borderWidth: 1, paddingVertical: 20, marginRight: 5, borderRadius: 10, backgroundColor: '#005D7F' , paddingHorizontal:12}} onPress={() => navigation.navigate('STransfer')}>
                        <View>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>  Source Godown   </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 1, paddingVertical: 20, marginLeft: 5, borderRadius: 10, backgroundColor: '#005D7F' }} onPress={() => navigation.navigate('DTransfer')}>
                        <View>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>Destination Godown</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    );
};
 
export default Transfer;
 
const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 52,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        top: '25%',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
   
   
    modalBox: {
        marginTop: 32,
        borderRadius: 4,
        backgroundColor: '#61dafb',
    },
    closeButton: {
        color: 'blue',
        marginTop: 10,
    },
});
 