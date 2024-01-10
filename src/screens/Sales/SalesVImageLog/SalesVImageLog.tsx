

import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification'
import { SalesQrScanSlipAsync } from '../../../redux/Slice/sales'
import Feather from 'react-native-vector-icons/FontAwesome5';

const SalesVImageLog = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { dataState } = route.params || {};
  console.log("DDDDDDDDDDDDDd----", dataState)

  //   dispatch(SalesQrScanSlipAsync(dataState))


  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(SalesQrScanSlipAsync(dataState))

    setRefreshing(false);
  };
  const handleBackButton = () => {
    navigation.navigate("SalesVSlip");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const SalesData = useSelector((state: any) => state.sales.SalesQrScan);
  const ImageAray: any = SalesData?.imagelog
  console.log("PP", ImageAray);
  // console.log("eeeeeeeeeeeeeeee", ImageAray[0])

    const activeTime = SalesData?.activeTime; 
   console.log("apii--", activeTime)
    const startTime = new Date(activeTime)
    console.log("Aaaaaaaaa-------------", startTime)

  function formatTimeDifference(minutes: any) {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const remainingMinutes = minutes % 60;

    let formattedDifference = '';
    if (days > 0) {
      formattedDifference += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
      formattedDifference += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (remainingMinutes > 0) {
      formattedDifference += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }

    return formattedDifference.trim();
  }

  //   const isAllVerified = ImageAray?.every((item: any) => item.verify);

  //   if (isAllVerified) {


  //     Dialog.show({
  //       type: ALERT_TYPE.SUCCESS,
  //       title: "Success",
  //       textBody: 'Aisle is already verified',
  //     })

  //     navigation.navigate('SalesVSlip');
  //   } else {

  //     console.log('Not all items are verified');
  //   }
  const isAllVerified = ImageAray?.every((item: any) => item.verify);
  useEffect(() => {
    // dispatch(SalesQrScanSlipAsync(dataState))


    if (isAllVerified) {
      const endTime = new Date();

      console.log("endtime-----------", endTime)
      const timeDifference = endTime.getTime() - startTime.getTime();

      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      const formattedTimeDifference = formatTimeDifference(minutesDifference);
      console.log("Formatted Time Difference:----", formattedTimeDifference)
      console.log("BBBbbbbbbbbbbbbbbbbb", minutesDifference, timeDifference)
      Alert.alert(`Total time taken=${formattedTimeDifference}`)



      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: 'Aisle is verified',
      })

      navigation.navigate('SalesVSlip');
    } else {

      console.log('Not all items are verified');
    }
  }, [ImageAray])
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <Navbar />
      <View style={{ margin: '3%', borderRadius: 10, borderWidth: 0.1, flexDirection: 'row', alignItems: 'center' }}>
        <Feather
          name="check"
          size={15}
          color={'#fff'}
          style={{
            backgroundColor: 'green',
            width: '8%',
            height: '50%',
            textAlign: 'center',  // Align the icon content in the center
            lineHeight: 25,
            borderRadius: 50,
            marginLeft: '6%' // Align the icon content vertically in the center
          }}
        />
        <Text className='text-center text-xl font-bold  m-3 text-black '>Tap Aisle for verification</Text>

      </View>
      <View style={{ marginVertical: '1%' }}>
        <FlatList
          style={{ maxHeight: 550 }}
          data={ImageAray ? ImageAray : []}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }

          renderItem={({ item }: any) => (
            <TouchableOpacity style={[
              styles.card,
              { backgroundColor: item.verify ? '#A1FFA033' : '#FF8B8B33' }
            ]}

              onPress={() => {
                if (!item.verify) {

                  navigation.navigate('SalesVerification', { aisleID: item.aisle._id, dataState: dataState });
                } else {

                  console.log('Item is already verified!');
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "warn",
                    textBody: 'This Aisle is already verified',
                  })

                }
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'column' }}>
                  <Text style={[styles.commonTextStyle, { color: '#005D7F', fontWeight: '700' }]}>Aisle Id: </Text>
                  <Text style={styles.commonTextStyle}>{item.aisle._id}</Text>
                </View>
                <Feather
                  name="expand"
                  size={20}
                  color={'black'}
                  style={{

                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: '#75757599',

                  marginHorizontal: '3%',
                  borderBottomWidth: 1,
                  marginBottom: '3%',
                  marginTop: '2%'
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.commonTextStyle, { color: '#005D7F', fontWeight: '700' }]}>Aisle Name: </Text>
                <Text style={styles.commonTextStyle}>{item.aisle.aisleName}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.commonTextStyle, { color: '#005D7F', fontWeight: '700' }]}>Aisle Code: </Text>
                <Text style={styles.commonTextStyle}>{item.aisle.aisleCode}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.commonTextStyle, { color: '#005D7F', fontWeight: '700' }]}>Item Quantity: </Text>
                <Text style={styles.commonTextStyle}>{item.quantity}</Text>
              </View>
            </TouchableOpacity>

          )}
        />

      </View>

    </View>
  )
}

export default SalesVImageLog

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    // elevation: 2,
    borderWidth: 0.3,
    borderColor: 'gray'
  },
  commonTextStyle: {
    color: '#6B778C',
    fontSize: 16, // You can adjust the font size as needed
    fontWeight: '500',
    margin: '1%'
    // Add any other common text styles here
  }
})