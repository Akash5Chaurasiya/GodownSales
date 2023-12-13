import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReconAsync } from '../../redux/Slice/reconciliation'


const Reconciliation = ({navigation}:any) => {
    const [displayList, setDisplayList] = useState('pending');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllReconAsync());
    }, [])


    const dataList = useSelector((state: any) => state.reconciliation.reconData);
    console.log("totototootot", dataList)
    const pendingList = dataList?.filter((data: any) => {
        return data.status === "Pending"
    })
    console.log("pending list ", pendingList)
    const approveList = dataList?.filter((data: any) => data.status === 'Approved');
    const handleApprovePress = () => {
        setDisplayList('approve');
    };

    const handlePendingPress = () => {
        setDisplayList('pending');
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navbar />
            {/* <View style={{ backgroundColor: '#005D7F', padding: '4%', marginVertical: '1%', borderRadius: 9, width:'50%', justifyContent:'center', alignItems:'center' }}> */}
                <Text style={{ color: '#005D7F', fontSize: 25, fontWeight: '900', marginTop:'5%', margin:'1%' }}>Reconciliation</Text>
                <View
          style={{
            borderBottomColor: '#B6E7EC',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            marginHorizontal: '3%',
            borderBottomWidth: 2
          }}
        />
            {/* </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '5%', alignContent: 'center' }}>
                <TouchableOpacity style={styles.Pending} onPress={handlePendingPress} >
                    <Feather
                        name='edit'
                        size={16}
                        color={'#005D7F'}
                        style={{ marginLeft: 10 }}
                    />
                    <Text style={styles.text}>Pending Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Approve} onPress={handleApprovePress} >
                    <Feather
                        name='edit'
                        size={16}
                        color={'#005D7F'}
                        style={{ marginLeft: 10 }}
                    />
                    <Text style={styles.text} >Approve Request</Text>
                </TouchableOpacity>
            </View>

            <View>

                <FlatList
                    // style={{ maxHeight: 550 }}
                    data={displayList === 'pending' ? pendingList : approveList}
                    keyExtractor={(item: any, index: any) => index.toString()}
                    renderItem={({ item }: any) => (

                        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("ReconScanQr",{aisleCode:item?.aisle?.aisleCode})}>
                            <Text>{item?.godown?.godownName}</Text>
                            <View className='flex '>

                            <View className='flex flex-col m-2'>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: '700', fontSize: 15, color: '#005D7F' }}>SHELF NAME:</Text>
                                    <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{item?.shelf?.shelfName}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontWeight: '700', fontSize: 15, color: '#005D7F' }}>SHELF CODE: </Text>
                                    <Text  style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{item?.shelf?.shelfCode}</Text>
                                </View>
                            </View>
                            <View className='flex flex-col m-2'>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: '700', fontSize: 15, color: '#005D7F' }} >AISLE NAME:</Text>
                                    <Text  style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{item?.aisle?.aisleName}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontWeight: '700', fontSize: 15, color: '#005D7F' }}>AISLE CODE: </Text>
                                    <Text  style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{item?.aisle?.aisleCode}</Text>
                                </View>

                            </View>
                            </View>


                        </TouchableOpacity>
                    )}
                />
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
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 19.46,
        textAlignVertical: 'center',
        textAlign: 'center',
        marginLeft: 8,
        color: '#005D7F'
    },
    card: {
        borderRadius: 8,
        backgroundColor: 'white',
        margin: 12,
        padding: 10,
        elevation: 2,
    },
})