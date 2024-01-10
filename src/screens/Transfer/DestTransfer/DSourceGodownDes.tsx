import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/navbar/Navbar'
const DSourceGodownDes = ({ navigation }: any) => {
  const sourceG = useSelector((state: any) => state.transfer.TranferSqrscan)
  console.log("ggggggggggggggggggggggg", sourceG)
  const formatDate = (dateTime: any) => {
    const date = new Date(dateTime);


    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;


    const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date);

    return {
      formattedDate,
      formattedTime,
    };
  };
  const { formattedDate, formattedTime } = formatDate(sourceG.sourceGodown.createdAt);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Navbar />
      <View style={{ maxHeight: 500, borderWidth: 0.5, height: '70%', margin: '5%', borderRadius: 8, borderColor: '#878787' }}>

        <Text style={styles.status}>{sourceG.status}</Text>

        <View style={{ flexDirection: 'row', marginTop: '8%', marginHorizontal: '6%',  }}>

          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.photo} />
          <View className='flex flex-col ml-3 '>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#172B4D' }}>{formattedDate}</Text>
            <Text className=' bg-blue-200 w-20 h-5 rounded-md font-extrabold text-black text-center'>{sourceG.typeOfTransfer}</Text>
            {/* <Text style={{ fontSize: 16, fontWeight: '700', color: '#005D7F' }}>Transfer Type- {sourceG.typeOfTransfer}</Text> */}

          </View>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#172B4D' }}>{formattedTime}</Text>

          {/* <Text className='ml-2 bg-blue-200 w-20 h-5 rounded-md font-extrabold text-black text-center'>{sourceG.typeOfTransfer}</Text> */}
          <Image source={{ uri:sourceG.Qr }} style={{...styles.photo, marginLeft:'17%'}} /> 

        </View>

        <View className='flex flex-row justify-between mx-5'>
          <View className='flex flex-col justify-center'>
            <Text className='text- text-base font-semibold text-[#005D7F]'>voucherCode</Text>
            <Text className='text- text-base font-normal text-[#172B4D]'>{sourceG.voucherCode}</Text>
          </View>
          <View className='flex flex-col justify-center'>
            <Text className='text- text-base font-semibold text-[#005D7F]'>Godown Code</Text>
            <Text className='text- text-base font-normal text-[#172B4D]'>{sourceG.sourceGodown.godownCode}</Text>
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
          <TouchableOpacity style={{ width: '90%', margin: '6%' }}>

            {/* <View style={{flexDirection:'row', justifyContent:'space-between'}}> */}
            {/* <View className='flex flex-col'> */}
            <Text className='font-semibold text-[#005D7F] text-lg'>Source Godown</Text>
            <View className='flex flex-row m-2 ' style={{ justifyContent: 'space-between' }}>
              <View className='flex flex-col'>


                <Text className='text- text-base font-semibold text-[#005D7F]'>GodownName:</Text>
                <Text className='text- text-base font-normal text-[#172B4D]'> {sourceG.sourceGodown.godownName}</Text>
              </View>
              <View className='flex flex-col'>


                <Text className='text- text-base font-semibold text-[#005D7F]'>Require Quantity:</Text>
                <Text className='text- text-base font-normal text-[#172B4D]'> {sourceG.destinationGodownQuantity.toFixed(2)}</Text>
              </View>
            </View>
            <View className='flex flex-col'>


<Text className='text- text-base font-semibold text-[#005D7F]'>Item Name:</Text>
<Text className='text- text-base font-normal text-[#172B4D]'> {sourceG.item.name}</Text>
</View>
            {/* </View> */}

            {/* <Image source={{  }} style={styles.photo} /> */}

            {/* </View> */}

            <View className='flex flex-row gap-1 justify-around my-3 border border-0.5 rounded-lg p-2 '>
              <View>
                <Text className='text- text-base font-bold text-[#005D7F]'>HSNCode</Text>
                <Text className='text- text-base font-normal text-[#172B4D]'>{ sourceG.item.HSNCode}</Text>
              </View>
              <View>
                <Text className='text- text-base font-bold text-[#005D7F]'>Weight</Text>
                <Text className='text- text-base font-normal text-[#172B4D]'>{sourceG.item.unit.weight}</Text>
              </View>
              <View>
                {/* <Text className='text- text-base font-bold text-[#005D7F]'>Image</Text> */}
                {/* <Text className='text- text-base font-normal text-[#172B4D]'>{ }</Text> */}
                <Image source={{ uri:sourceG.item.images[0] }} style={{...styles.photo, }} /> 
              </View>
            </View>
          </TouchableOpacity>

        </View>



      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }} className=' gap-2'>
        <TouchableOpacity style={{ width: '90%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 }} onPress={() => navigation.navigate("DTransferAisleScan", {transferId:sourceG._id, itemId: sourceG.item._id})}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload -</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: '4%', borderRadius: 9, borderWidth: 1, borderColor: '#005D7F' }}>
   <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload another aisle</Text>
 </TouchableOpacity> */}


      </View>

    </View>
  )
}

export default DSourceGodownDes

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
    width: '25%',
    marginTop: '5%',
    marginLeft: '2%',
    marginBottom: '-5%'

  },

})