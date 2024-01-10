import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReconAsync } from '../../redux/Slice/reconciliation'
import Feather1 from 'react-native-vector-icons/FontAwesome5'


const Reconciliation = ({ navigation }: any) => {
    const [displayList, setDisplayList] = useState('pending');
    const [refreshing, setRefreshing] = useState(false);
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
    function formatDate(dateTimeString: string): string {
        const date = new Date(dateTimeString);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
      }
    const onRefresh = async () => {
        setRefreshing(true);
        // await pendingList
        // await approveList
        dispatch(getAllReconAsync());
        setRefreshing(false);
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navbar />
            {/* <View style={{ backgroundColor: '#005D7F', padding: '4%', marginVertical: '1%', borderRadius: 9, width:'50%', justifyContent:'center', alignItems:'center' }}> */}
            <Text style={{ color: '#005D7F', fontSize: 25, fontWeight: '900', marginTop: '5%', margin: '1%' }}>Reconciliation</Text>
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
                    style={{ maxHeight: 550 }}
                    data={displayList === 'pending' ? pendingList : approveList}
                    keyExtractor={(item: any, index: any) => index.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }

                    renderItem={({ item }: any) => (


                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ReconScanQr", { aisleCode: item?.aisle?.aisleCode, reconID: item._id })}>
                            {/* <Text>{item?.godown?.godownName}</Text> */}
                            <View className='flex '>

                                <View className='flex flex-row justify-between'>

                                    <View style={{ flexDirection: 'row', backgroundColor: "white", borderRadius: 16, paddingHorizontal: '2%', paddingVertical: '2%', alignItems: 'center',borderWidth:0.1, elevation:2 }}>
                                        <Text style={{ fontWeight: '800', fontSize: 12, color: '#005D7F' }}>SHELF NAME- </Text>
                                        <Text style={{ fontWeight: '800', fontSize: 12, color: '#6B778C', marginLeft: 3 }}>{item?.shelf?.shelfName}</Text>

                                    </View>
                                    <Feather1
                                        name="expand"
                                        size={20}
                                        color={'black'}
                                        style={{

                                        }}
                                    />
                                  
                                    {/* <View style={{ flexDirection: 'row', backgroundColor: "black", borderRadius: 16, paddingHorizontal: '2%', paddingVertical: '1%', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: '400', fontSize: 12, color: 'white' }}>SHELF CODE- </Text>
                                        <Text style={{ fontWeight: '700', fontSize: 12, color: 'white', marginLeft: '1%' }}>{item?.shelf?.shelfCode}</Text>
                                    </View> */}
                                </View>
                                <View
                                        style={{
                                            borderBottomColor: 'gray',

                                            marginHorizontal: '2%',
                                            borderBottomWidth: 1,
                                            marginBottom: '3%',
                                            marginTop: '4%'
                                        }}
                                    />
                                <View className='flex flex-row justify-between' >
                                    <View style={{marginHorizontal:'2%', marginTop:'2%'}}> 
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '700', fontSize: 15, color: '#005D7F' }} >AISLE NAME:</Text>
                                        <Text style={{ fontWeight: '400', fontSize: 14, color: '#6B778C', marginLeft: '1%' }}>{item?.aisle?.aisleName}</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ fontWeight: '700', fontSize: 15, color: '#005D7F' }}>AISLE CODE: </Text>
                                        <Text style={{ fontWeight: '400', fontSize: 14, color: '#6B778C', marginLeft: '1%' }}>{item?.aisle?.aisleCode}</Text>
                                    </View>
                                    </View>
                                   
                                    <View style={{ flexDirection: 'row',justifyContent:'flex-end' , alignItems:'flex-end' }}>
                                        <Text style={{ fontWeight: '700', fontSize: 15, color: '#005D7F' }}>Date: </Text>
                                        <Text style={{ fontWeight: '400', fontSize: 14, color: '#6B778C', marginLeft: '1%' }}>{formatDate(item?.createdAt)}</Text>
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