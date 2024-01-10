import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/navbar/Navbar'
import Feather from 'react-native-vector-icons/Feather';
import { reconUpdateItemsAsync } from '../../../redux/Slice/reconciliation';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { Badge } from 'react-native-paper';

// reconID:reconID
const ReconAisleDes = ({ navigation, route }: any) => {
  const { reconID, } = route.params || {}
  const reconId = reconID
  console.log("+++++++++++++++++++++++++++++++++++", reconId,)
  const dispatch = useDispatch();

  const dataAfterScan = useSelector((state: any) => state.aisle.scanaisle)
  // const dataList = dataAfterScan.itemData;


  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [itemData, setitemData] = useState<any>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [dataList , setdataList] = useState(dataAfterScan?.itemData)
  const [updateList , setupdateList] = useState<any>([])

  const handleUpdateItemData = (updatedItemData: any) => {

    console.log("updatedddddddddddddddd", updatedItemData)

    setitemData((prevData: any) => [...prevData, updatedItemData]);
    // setitemData({
    //   itemData: updatedItemData,
    // });


  };
console.log("itemData-t-t-t--t", itemData)
  const handleItemAdd = (itemId: any, item:any) => {
    console.log("!!!!!!!!!!!!!!!!" ,item)
    const updatedDataList = dataList.filter((dataItem: any) => dataItem.item._id !== itemId);
    
    if (selectedItems.includes(itemId)) {
      
      setSelectedItems(selectedItems.filter((selectedItem: any) => selectedItem !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
    setdataList(updatedDataList)

    console.log("updateeddditem list", updatedDataList)
    //filter the item same id 
    const scannedDataList = dataList.filter((dataItem: any) =>dataItem.item._id === itemId);
    console.log("sacccccccccccc", scannedDataList)
    //now want to check if this item (from scanneddatalist)is prent in updtelist  if not add 
    // const isItemAlreadyAdded = updateList.some((updateItem: any) => updateItem.item._id === itemId);
    if ( scannedDataList.length > 0) {
      // If the item is not already in updateList and is present in scannedDataList, add it to updateList
      setupdateList((prevList: any) => [...prevList, item]);
      console.log("Item added to updateList:", scannedDataList);
    } else {
      console.log("Item is either already in updateList or not found in scannedDataList");
    }
    // setupdateList((prevList:any) => [...prevList, item]);
   
  }
console.log("datalist------------", dataList)
console.log("updated scanned list-0-0-----",updateList)
  console.log("selectedItem --t-t-t-", selectedItems.length, selectedItems)



  const handleSendRequest = () => {

    const apiPayload = {
      status: "processing",
     
      items: itemData.map((item: any) => ({
        item: item.item,
        quantity: item.quantity,
        updatedquantity: item.updatedquantity,
        imageString: item.imageString,
      })
      ),

    }
    const apiPayloadData = {apiPayload, reconID:reconID }
    console.log("aiiiiiload----------------------fffff", apiPayload, reconID, apiPayloadData)
    dispatch(reconUpdateItemsAsync(apiPayloadData)).then((res: any) => {
      console.log("------------", res.payload)
      if (res.payload.status) {


          Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: 'Request send Successfully',
        })

        navigation.navigate('Reconciliation');


      }
      else {

        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: res.payload.message,
        })
        setIsButtonDisabled(true)
        navigation.navigate('Reconciliation');

      }
    })
  }
  useEffect(() => {

    setIsButtonDisabled(selectedItems.length !== dataAfterScan.itemData.length);
  }, [selectedItems, ]);
 


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Navbar />
      <View style={styles.view1}>
        <View className='flex flex-row justify-between '>
          <Text style={styles.bar}>Aisle Name: {dataAfterScan?.aisleName}</Text>
          <Text style={styles.bar}>Aisle Code: {dataAfterScan?.aisleCode}</Text>
        </View>

        <View style={{ marginTop: '8%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#005D7F', margin: '2%' }}>Items</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{dataAfterScan.itemData.length}</Text>
          </View>

        </View>

        <View
          style={{
            borderBottomColor: '#B6E7EC',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            marginHorizontal: '3%',
            borderBottomWidth: 1,
            marginBottom: '3%'
          }}
        />

        <View>

          <FlatList
            data={dataList}
            keyExtractor={(item, index) => index.toString()}
            style={{ maxHeight: 200 }}
            
            
            renderItem={({ item }) => {
              
      

              const lastEntry = item?.item?.changeLog[item?.item?.changeLog?.length - 1];
              console.log("lastenntry", item?.item?.changeLog[0])

              const lastDate = lastEntry ? new Date(lastEntry.date).toLocaleDateString() : null;
           
              return (
                <View style={styles.card}>
                  <View className='flex flex-row justify-between'>
                    <View className='flex flex-row '>
                      <Image source={{ uri: item?.item?.images[0] }} style={styles.photo} />
                      <View className='flex flex-col ml-1'>

                        <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 16, }}>Quantity Present</Text>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>{item.quantity}</Text>
                      </View>
                    </View>
                    <View>
                      <Feather
                        name="camera"
                        size={20}
                        color={'black'}
                        onPress={() => {
                          navigation.navigate('ReconAislePhoto', {
                            selectedItemId: item.item._id,
                            selectedQty: item.quantity,
                            reconID:reconID,
                            handleUpdateItemData,
                          }),
                          handleItemAdd(item.item._id, item)
                        }
                        }
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 15 }}> {item?.item?.name}</Text>
                    {/* <Text style={{ color: isItemSelected ? '#00FF00' : '#FF0000', fontWeight: '600', fontSize: 18 }}>{isItemSelected ? 'Selected' : 'Not Selected'}</Text> */}

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
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#005D7F', margin: '2%' }}>Selected Items</Text>
        <View
          style={{
            borderBottomColor: '#B6E7EC',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            marginHorizontal: '3%',
            borderBottomWidth: 1,
            marginBottom: '3%'
          }}
        />
        <>
          <View>
          <FlatList
            data={updateList}
            keyExtractor={(item, index) => index.toString()}
            style={{ maxHeight: 210 }}
            renderItem={({ item }) => {
              // const isItemSelected = selectedItems.some((selectedItem) => selectedItem.itemId === item.item._id);

              const lastEntry = item?.item?.changeLog[item.item?.changeLog?.length - 1];
              console.log("LEN---", item?.item?.changeLog[item.item?.changeLog?.length - 1])

              const lastDate = lastEntry ? new Date(lastEntry.date).toLocaleDateString() : null;
           
              return (
                <View style={styles.card}>
                  <View className='flex flex-row justify-between'>
                    <View className='flex flex-row '>
                      <Image source={{ uri: item?.item?.images[0] }} style={styles.photo} />
                      <View className='flex flex-col ml-1'>

                        <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 16, }}>Quantity Present</Text>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>{item?.quantity}</Text>
                      </View>
                    </View>
                  
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 18 }}> {item?.item?.name}</Text>
                    {/* <Text style={{ color: isItemSelected ? '#00FF00' : '#FF0000', fontWeight: '600', fontSize: 18 }}>{isItemSelected ? 'Selected' : 'Not Selected'}</Text> */}

                    <View className='flex flex-col'>
                      <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 13 }}>Last Updated</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 13 }}>{lastDate}</Text>

                    </View>
                  </View>



                </View>
              );
            }}
          />


          
            {/* {selectedItems.map((selectedItem) => (
              <Text key={selectedItem.itemId}>
                Item ID: {selectedItem}
              </Text>
            ))} */}
          </View>
        </>


      </View>
      <View style={{ position: 'relative', width: '100%' }}>
      <Badge style={{ position: 'absolute', top: -14, right: 15,bottom:13,  backgroundColor: 'red' }}>{selectedItems.length}</Badge>
      <TouchableOpacity
        style={{
          width: '85%', backgroundColor: isButtonDisabled ? 'rgba(0, 93, 127, 0.5)' : '#005D7F',
          padding: '4%',
          borderRadius: 9, marginLeft: '8%',
          opacity: isButtonDisabled ? 0.7 : 1,
        }} disabled={isButtonDisabled} onPress={handleSendRequest} >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Send Request</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReconAisleDes

const styles = StyleSheet.create({
  view1: {
    padding: '3%',
    margin: '6%',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
    // width: '98%',
    height: '72%',
    // flexDirection: 'column',
  },
  photo: {

    width: 80,
    height: 80,
    borderRadius: 10,
    margin: '1%'
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
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#005D7F',
    borderRadius: 22, // Adjust as needed for the desired shape
    paddingHorizontal: 2, // Add horizontal padding to give some space around the content
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 25, // Set a minimum width to ensure it's not too small
    minHeight: 20, // Set a minimum height to ensure it's not too small
    elevation: 2
  },
  badgeText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600'
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
})