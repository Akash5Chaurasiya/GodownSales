import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const PurchasePage = ({navigation}:any) => {
  const datafromApi = useSelector((state:any)=>state.purchase.purchaseQrScanData)
  console.log("pursadeS", datafromApi)

  const formatDate = (dateTime: any) => {
    const date = new Date(dateTime);


    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const formattedDated = date.toLocaleDateString(); // Adjust the format as needed
    const formattedTime = date.toLocaleTimeString();
    console.log("----",formattedDate, formattedDated)
    // const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date);

    return {
      formattedDate,
      formattedTime,
    };
  };

  const handleOk =()=>{
    if(datafromApi.status ==='pending'){
      navigation.navigate("ScanPurchaseAisle")
    }
    else{
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Warn",
        textBody:'No more quantity present :)',
      })
      navigation.navigate("Purchase")
    }
    }
  const { formattedDate, formattedTime } = formatDate(datafromApi.createdAt);
  return (

    <View style={styles.card}>
      <Navbar />
      <View style={{ maxHeight: 500, borderWidth: 0.5, height: '70%', margin: '5%', borderRadius: 8, borderColor: '#878787' }}>
      <Text style={datafromApi.status === 'pending' ? styles.status : styles.defaultstatus}>{datafromApi.status}</Text>
            
          
        <View style={{ flexDirection: 'row', marginTop: '8%', marginHorizontal: '4%' }}>

          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.photo} />
          <View className='flex flex-col ml-3'>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#172B4D' }}>{formattedDate}</Text>
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#005D7F' }}>{datafromApi.godown.godownName}</Text>

          </View>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#172B4D' }}>{formattedTime}</Text>

          {/* <Text className='ml-2 bg-blue-200 w-10 h-5 rounded-md font-extrabold text-black text-center'>{datafromApi?.godown?.godownCode}</Text> */}


        </View>

        <View className='flex flex-row justify-between mx-5'>
          <View className='flex flex-col justify-center'>
            <Text className='text- text-base font-semibold text-[#005D7F]'>Purchase Number</Text>
            <Text className='text- text-base font-normal text-[#172B4D]'>{datafromApi?.purchaseOrder?.orderNumber}</Text>
          </View>
          <View className='flex flex-col justify-center'>
            <Text className='text- text-base font-semibold text-[#005D7F]'>Bill Number</Text>
            <Text className='text- text-base font-normal text-[#172B4D]'>-</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#B6E7EC',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            margin: '6%',
            borderBottomWidth: 3
          }}
        />

        <View>
          <TouchableOpacity style={{width:'90%', margin:'6%'}}>
          
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View className='flex flex-col'>
            <Text className='font-semibold text-[#005D7F] text-lg'>Raw Marteial </Text>
            <View className='flex flex-row'>

           
              <Text className='text- text-base font-semibold text-[#005D7F]'>Item Name:</Text>
              <Text className='text- text-base font-normal text-[#172B4D]'> {datafromApi?.itemData[0]?.item?.name.substring(0, 16)}</Text>
              </View>
              </View>
              
              <Image source={{ uri: datafromApi.qrCode }} style={styles.photo} />

            </View>

            <View className='flex flex-row gap-1 justify-around my-3 border border-0.5 rounded-lg p-2 '>
            <View>
              <Text className='text- text-base font-bold text-[#005D7F]'>HSNCode</Text>
              <Text className='text- text-base font-normal text-[#172B4D]'>{datafromApi?.itemData[0]?.item?.HSNCode}</Text>
            </View>
            <View>
              <Text className='text- text-base font-bold text-[#005D7F]'>Quantity</Text>
              <Text className='text- text-base font-normal text-[#172B4D]'>{datafromApi?.itemData[0]?.quantity}</Text>
            </View>
            <View>
              <Text className='text- text-base font-bold text-[#005D7F]'>Price</Text>
              <Text className='text- text-base font-normal text-[#172B4D]'>{datafromApi?.itemData[0]?.price}</Text>
            </View>
            </View>
          </TouchableOpacity>

        </View>



      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }} className=' gap-2'>
        <TouchableOpacity style={{ width: '90%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 }} onPress={handleOk}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload -</Text>
        </TouchableOpacity>
       


      </View>




    </View>
  )
}

export default PurchasePage

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1
  },
  photo: {

    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  status: {
    fontSize: 15,
    color: '#FF8B00',
    fontWeight: '600',
    // marginLeft:'5%', 
    backgroundColor: 'yellow',
    borderRadius: 10,
    // textAlign: 'center',
    paddingHorizontal: '2%',
    paddingVertical: 1, 
    width:'20%',
    marginTop:'5%',
    marginLeft:'2%',
    marginBottom:'-5%'

  },
  defaultstatus: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    // marginLeft:'5%', 
    backgroundColor: 'green',
    borderRadius: 10,
    // textAlign: 'center',
    paddingHorizontal: '2%',
    paddingVertical: 1, 
    width:'25%',
    marginTop:'5%',
    marginLeft:'2%',
    marginBottom:'-5%'

  },

})