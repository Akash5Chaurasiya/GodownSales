import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { TouchableRipple } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather';

const Dashboard = () => {
    return (
        <View style={{ backgroundColor: '#FAFAFA' }}>
            <View>
                <Navbar />
            </View>
            <View style={{ backgroundColor: '#FAFAFA' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, alignContent: 'center' }}>
                    <TouchableOpacity style={styles.Purchase}>
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
        borderWidth: 1,
        paddingVertical: 20,
        backgroundColor: '#E2F6F7',
        flexDirection: 'row',
        width: '43%',
        borderRadius: 50,

    },
    Sales: {
        borderWidth: 1,
        paddingVertical: 20,
        backgroundColor: '#E0F3EE',
        flexDirection: 'row',
        width: '43%',
        borderRadius: 50
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