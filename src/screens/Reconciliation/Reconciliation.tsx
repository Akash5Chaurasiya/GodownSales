import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import {getAllReconAsync} from '../../redux/Slice/reconciliation'


const Reconciliation = () => {
   const dispatch= useDispatch();
   useEffect(()=>{
    dispatch(getAllReconAsync());
},[])


    const dataList = useSelector((state:any)=>state.reconciliation.reconData);
    console.log("totototootot", dataList)

  
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navbar />
            <View style={{ backgroundColor: '#005D7F', padding: '4%', marginVertical: '1%', borderRadius: 1 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Reconciliation</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, alignContent: 'center' }}>
                <TouchableOpacity style={styles.Pending} >
                    <Feather
                        name='trending-down'
                        size={18}
                        color={'black'}
                        style={{ marginLeft: 10 }}
                    />
                    <Text style={styles.text}>Pending Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Approve} >
                    <Feather
                        name='trending-up'
                        size={18}
                        color={'black'}
                        style={{ marginLeft: 10 }}
                    />
                    <Text style={styles.text} >Approve Request</Text>
                </TouchableOpacity>
            </View>








        </View>
    )
}

export default Reconciliation

const styles = StyleSheet.create({
    Pending: {
        // borderWidth: 1,
        paddingVertical: 18,
        backgroundColor: '#E2F6F7',
        flexDirection: 'row',
        width: '40%',
        borderRadius: 50,
        elevation: 4

    },
    Approve: {
        // borderWidth: 1,
        paddingVertical: 18,
        backgroundColor: '#E0F3EE',
        flexDirection: 'row',
        width: '40%',
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