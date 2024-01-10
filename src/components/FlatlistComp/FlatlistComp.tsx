import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
export interface RTListItem {
  photo: any, dateTime: any, status: any, productNumber: any, qrCode: any, numberName?: any, typeOftransfer?: any, movingPage?: any, navigation?: any, lastActiveTime?: any
}

export default function FlatlistComp(props: RTListItem) {
  const { qrCode, dateTime, photo, status, productNumber, numberName, typeOftransfer, movingPage, navigation, lastActiveTime } = props
  // console.log("photo ", dateTime)

  const f = (d: any) => {
    const date = new Date(d);
    if (isNaN(date.getTime())) {
      return { formattedlastd: '', formattedlastTime: '' };
    }
  
    console.log("date---t-t-t-t-", date + "")
    const formattedlastd = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedlastTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    console.log("000", formattedlastd, formattedlastTime);
    return { formattedlastd, formattedlastTime }

  }
  const { formattedlastd, formattedlastTime } = f(lastActiveTime)
  // console.log("time-----------", time)

  const formatDate = (dateTime: any) => {
    const date = new Date(dateTime);
    // console.log("date", date+"")//cur timme 


    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;


    const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date);

    return {
      formattedDate,
      formattedTime,
    };
  };

  const { formattedDate, formattedTime } = formatDate(dateTime);
  return (

    <TouchableOpacity style={styles.card} onPress={() => movingPage ? navigation.navigate(movingPage) : null} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Image source={{ uri: photo }} style={styles.photo} />
        <View className='flex flex-col justify-start ' style={{ marginLeft: '-15%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>

            <Text style={styles.time}>{formattedTime}</Text>
            <View>
              <Text style={status === 'pending' ? styles.status : styles.defaultstatus}>{status}</Text>
            </View>

          </View>
          {typeOftransfer ? <Text style={{ marginLeft: '12%', color: 'black' }}>Transfer Type-{typeOftransfer}</Text> : null}
         
       
       
        </View>



        <Image source={{ uri: qrCode }} style={styles.photo} />

      </View>
     

     
     
    

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,  alignItems:'center'}}>
      <View className='flex flex-col mt-1 '>
      <View>
      {/* {formattedlastTime?<Text style={{ color:'black', fontWeight:'700'}}>Last Active Time-{formattedlastTime}</Text>:null} */}
      {!isNaN(Date.parse(lastActiveTime)) && formattedlastTime ? (
  <Text style={{ color: 'black', fontWeight: '700' }}>
    Last Active Time - {formattedlastTime}
  </Text>
) : null}

      </View>
        <View style={styles.bottomSection}>
          <Text style={styles.productNumber}>{numberName}</Text>
          <Text style={styles.purchaserNumber}>{productNumber}</Text>

        </View>
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
    marginTop: '5%',
  },
  purchaserNumber: {
    fontSize: 16,
    color: '#005D7F',
    fontWeight: '700'

  },
  defaultstatus: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    // marginLeft:'5%', 
    backgroundColor: 'green',
    borderRadius: 10,
    textAlign: 'center',
    paddingHorizontal: '2%',
    paddingVertical: 1
  },
})