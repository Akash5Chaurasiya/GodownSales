import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image ,Alert} from 'react-native'
import React , {useEffect, useState}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../../../components/navbar/Navbar'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


const SAisleDes = ({ navigation, route }: any) => {
  const datafromApi = useSelector((state: any) => (state.aisle.scanaisle))
  console.log("dataFrom purshare", datafromApi)

  const { transferId, itemId } = route.params || {};
  console.log("transefer id on des asile tranfer page -------------------", transferId)
  console.log("itemmmmr id on des asile tranfer page -------------------", itemId)
  const dataList = datafromApi.itemData;
  const [showAlert, setShowAlert] = useState(false);
  const isItemPresent = dataList.find((item: any) => item.item._id === itemId);
  const isItem = dataList.find((item: any) => item.item._id === itemId);
  console.log("ccccccccccccccccccccccccccccccccccc-t-t-t-t-", isItem, isItemPresent)
  // const aisleIds = isItem.map((item:any )=> item.aisleId !== undefined ? item.aisleId : null);
  const aisleId = isItem?.aisleId

console.log("Aisle IDs for items with the same ID:-----------", aisleId);
  // if (!isItemPresent) {
  //   setShowAlert(true);
  // }

  // const handleUnloadAnotherAisle = () => {
  //   setShowAlert(false);
  //   navigation.navigate("SourceGodownDes");
  // };
  
 
  // const showAlertF = () => {
  //   Alert.alert(
  //     "Transferred item is not available in this aisle",
  //     "",
  //     [{ text: "OK", onPress: () => handleUnloadAnotherAisle() }]
  //   );
  // };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Navbar />
      <View className='m-4'>
        <Text style={{ color: 'black', fontWeight: '700', fontSize: 22 }}>Aisle Description :</Text>
      </View>

      <View  >


      

           { isItemPresent ?
              (
                <View>

                  <View style={styles.view1}>
                    <View className='flex flex-row justify-between '>
                      <Text style={styles.bar}>Aisle Name: {datafromApi?.aisleName}</Text>
                      <Text style={styles.bar}>Aisle Code: {datafromApi?.aisleCode}</Text>
                    </View>

                    <View>
                      <FlatList
                        data={dataList}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ maxHeight: 340 }}
                        renderItem={({ item }) => {
                          const lastEntry = item.item.changeLog[item.item.changeLog.length - 1];

                          const lastDate = lastEntry ? new Date(lastEntry.date).toLocaleDateString() : null;

                          return (
                            <View style={styles.card}>
                              <View className='flex flex-row justify-between'>
                                <View className='flex flex-row '>
                                  <Image source={{ uri: item.item.images[0] }} style={styles.photo} />
                                  <View className='flex flex-col'>

                                    <View className='flex flex-row ml-1'>

                                      <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 16, }}>Quantity Present: </Text>
                                      <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>{item.quantity.toFixed(2)}</Text>
                                    </View>
                                    <View className='flex flex-row ml-1'>

                                      <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 16, }}>Price: </Text>
                                      <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>{item.price}</Text>
                                    </View>
                                  </View>
                                </View>

                              </View>

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 18 }}> {item.item.name}</Text>


                                <View className='flex flex-col'>
                                  <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 13 }}>Last Updated</Text>
                                  <Text style={{ color: 'black', fontWeight: '600', fontSize: 13 }}>{lastDate}</Text>

                                </View>
                              </View>



                            </View>
                          );
                        }}
                      />




                    </View>



                  </View>

                  <View style={{ flexDirection: 'column', alignItems: 'center' }} className='gap-2  mt-2' >
                    <TouchableOpacity style={{ width: '90%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9 }} onPress={() => navigation.navigate("SAislePhoto",{transferId:transferId, itemId: itemId,aisleId:aisleId })}>
                      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: '4%', borderRadius: 9, borderWidth: 1, borderColor: '#005D7F' }} onPress={() => navigation.navigate("SourceGodownDes")}>
                      <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Unload another aisle</Text>
                    </TouchableOpacity>


                  </View>
                </View>
              )
              :
               (
                <View>
                  <Text>item is not same in aisle please check again</Text>
                  
                 {navigation.navigate("SourceGodownDes")
                 }
                  {Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please check:)Item is not same in aisle ",
      })}

                  </View>
               )}



        

      </View>
   

    </View >




  )
}

export default SAisleDes

const styles = StyleSheet.create({
  view1: {
    padding: '3%',
    marginHorizontal: '6%',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
    marginTop: '1%',
    // width: '98%',
    height: '70%',
    // flexDirection: 'column',
  },
  bar: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    // marginLeft:'5%', 
    backgroundColor: 'black',
    borderRadius: 10,
    // textAlign: 'center',
    paddingHorizontal: '2%',
    paddingVertical: 4

  },
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 10,
    padding: 13,
    elevation: 2,
    // flexDirection:'row'
    // borderColor: 'black',
    // borderWidth: 0.4
  },
  photo: {

    width: 80,
    height: 80,
    borderRadius: 10,
    margin: '1%'
  },
})