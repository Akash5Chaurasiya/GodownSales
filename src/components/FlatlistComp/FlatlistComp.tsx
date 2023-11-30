import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React from 'react'
export interface RTListItem {
  photo: any, dateTime: any, productName: any, status: any, productNumber: any, qrCode: any
}

export default function FlatlistComp(props: RTListItem) {
  const { qrCode, dateTime, photo, status, productNumber } = props
  // console.log("photo ", dateTime)

  const formatDate = (dateTime: any) => {
    const date = new Date(dateTime);


    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;


    const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date);

    return {
      formattedDate,
      formattedTime,
    };
  };

  const { formattedDate, formattedTime } = formatDate(dateTime);
  return (

    <TouchableOpacity style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Image source={{ uri: photo }} style={styles.photo} />
        <View style={{ flexDirection: 'row', marginLeft: '-25%', justifyContent: 'space-around', alignItems: 'flex-start' }}>

          <Text style={styles.time}>{formattedTime}</Text>
          <View>
            <Text style={styles.status}>{status}</Text>
          </View>

        </View>



        <Image source={{ uri: qrCode }} style={styles.photo} />

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


        <View style={styles.bottomSection}>
          <Text style={styles.productNumber}>Purchase Number</Text>
          <Text style={styles.purchaserNumber}>{productNumber}</Text>

        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.productNumber}>Date</Text>
          <Text style={styles.purchaserNumber}>{formattedDate}</Text>

        </View>
      </View>
    </TouchableOpacity>

  )
}



const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    elevation: 2,
  },
  photo: {

    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  topSection: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    marginBottom: 10,
  },
  time: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '5%'
  },
  status: {
    fontSize: 15,
    color: '#FF8B00',
    fontWeight: '600',
    // marginLeft:'5%', 
    backgroundColor: 'yellow',
    borderRadius: 10,
    textAlign: 'center',
    paddingHorizontal: '2%',
    paddingVertical: 1

  },
  productNumber: {
    fontSize: 16,
    color: '#005D7F',
    fontWeight: '400'


  },
  bottomSection: {
    marginTop: '10%',
  },
  purchaserNumber: {
    fontSize: 16,
    color: '#005D7F',
    fontWeight: '700'

  },
})