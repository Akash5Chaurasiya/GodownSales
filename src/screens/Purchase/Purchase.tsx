import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TouchableOpacity, TextInput, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { SearchBar } from 'react-native-screens'
import SearchComponent from '../../components/searchBar/SearchBar'
import FlatlistComp from '../../components/FlatlistComp/FlatlistComp'
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPurchaseSlipAsync } from '../../redux/Slice/purchaseSlice'
import { RadioButton } from 'react-native-paper';


const Purchase = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = React.useState<string | undefined>();
  const [selectedItem, setSelectedItem] = useState(null);



  const photo = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

  useEffect(() => {
    dispatch(getAllPurchaseSlipAsync());
  }, [])

  const pendingpurchaseList = useSelector((state: any) => state.purchase.purchaseSlip)
  const purchaseList = pendingpurchaseList?.filter((purchase: any) => purchase.status === 'pending')
  console.log("----------------------------editititi", purchaseList)

  const purchaseNumbers: any = [];

  purchaseList?.forEach((purchase: any, index: any) => {
    // Assuming "purchaseOrder" is the purchase nuer
    // const purchaseNumber = purchase.purchaseOrder._id;
    const purchaseNumber = purchase._id;
    console.log("mmmmmmmm----------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..", purchaseNumber)
    purchaseNumbers.push({ purchaseNumber });
  });

  console.log('Purchase Numbers:---------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', purchaseNumbers);
  console.log('textttt---------------------------->', text, show);
  const handleSubmit = () => {
    setShow(false);
    setText('');
  };

  const textstring = text?.toString();
  console.log("textstring", textstring)
  const searchres = purchaseNumbers?.filter((purchaser: any) => {
    const includesText = purchaser?.purchaseNumber?.includes(textstring);
    console.log('Includes Text:', includesText);
    return includesText;
  });
  console.log("search res", searchres)
  const handleSelectRadio = (name: any) => {
    console.log("name", name)
    setSelectedItem(name);
    setShow(false)
  };
  console.log("radio btn", selectedItem)

  console.log("searchres--------------->today", searchres)

  const filteredData = purchaseList?.filter((purchase: any) => {
    const purchaseOrderId = purchase?._id;
    // const purchaseOrderId = purchase?.purchaseOrder?._id; // Access _id inside purchaseOrder
    return purchaseOrderId === selectedItem;

    // console.log("ttttttttttttttttttttttttttttttt", purchase?.purchaseOrder?.includes(selectedItem))
  });
  const dataList = selectedItem && text ? filteredData : purchaseList;
  console.log("Filtered Data:-------------------------->", filteredData);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getAllPurchaseSlipAsync())
    // await completed
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <Navbar />
      <View>
        <View className='flex flex-row justify-around ' style={{ alignItems: 'center' }}>
          <Text className='text-center text-lg font-extrabold m-5 text-black underline'>Pending Purchase Slip</Text>
          <TouchableOpacity style={{ borderRadius: 9, borderWidth: 0.5, marginRight: '3%', width: '40%', height: '50%', padding: '1%', alignItems: 'center', backgroundColor: 'green' }} onPress={() => navigation.navigate("PurchaseVSlip")}><Text className='font-semibold text-[#ffffff] text-sm'>Verify Completed Slip-></Text></TouchableOpacity>

        </View>


        <View style={{ marginHorizontal: '4%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {/* <SearchComponent /> */}
          <View
            style={[
              styles.container,
              {
                backgroundColor: selected ? '#fff' : '',
                elevation: selected ? 2 : 0,
              },
            ]}
          >
            <Feather
              name="search"
              size={18}
              color={'black'}
              style={styles.searchIcon}
            />

            <TextInput
              placeholder="Search..."
              onFocus={() => setSelected(true)}
              onBlur={() => setSelected(false)}
              onChangeText={text => {
                setShow(true);
                console.log('text---------------', text);
                setText(text);
              }}
              className="text-base text-slate-700"
              placeholderTextColor={'#64748B'}
              style={styles.input}
              onSubmitEditing={handleSubmit}

            />
            {text && (
              <TouchableOpacity
                onPress={() => {
                  setText('');
                }}
              >
                <Feather
                  name="x"
                  size={18}
                  color={'black'}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
            )}
            {text && show && (
              <View style={styles.searchAssistContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                  <FlatList
                    style={{ maxHeight: 350 }}
                    data={searchres}
                    keyExtractor={(item, index) => index.toString()} // Set a unique key for each item
                    renderItem={({ item }) => (
                      <View style={styles.listItem}>
                        <Text style={{
                          fontFamily: 'Inter-SemiBold',
                          color: 'black',
                        }}>{item.purchaseNumber}</Text>
                        <RadioButton.Android
                          value={item.purchaseNumber}
                          status={selectedItem === item.purchaseNumber ? 'checked' : 'unchecked'}
                          onPress={() => handleSelectRadio(item.purchaseNumber)}
                        />
                      </View>
                    )}
                  />
                </SafeAreaView>
              </View>
            )}



          </View>

          <TouchableOpacity onPress={() => navigation.navigate("PurchaseCamera")}>
            <Feather
              name="camera"
              size={25}
              color={'black'}
              style={{ textAlignVertical: 'center', alignItems: 'center', }}
            /></TouchableOpacity>

        </View>
        <View style={{ marginVertical: '1%' }}>
          <FlatList
            style={{ maxHeight: 550 }}
            data={dataList}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (

              <FlatlistComp
                photo={photo}
                qrCode={item.qrCode}
                numberName={"Purchaser Id"}
                dateTime={item.createdAt}
                status={item.status}
                productNumber={item?._id}
              // productName={item.productName}

              />
            )}
          />

        </View>



      </View>
    </View>
  )
}

export default Purchase

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginLeft: '3%',
    marginRight: '3%',
  },
  searchIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  searchInput: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    width: '80%',
    borderWidth: 1,
    borderColor: '#CFD3D4',
    borderRadius: 4,
    gap: 10,
    padding: 8,
    alignItems: 'center',
    position: 'relative',
    zIndex: 9999,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: 'Inter-Regular',
    padding: 0,
    color: 'black'
  },
  searchAssistContainer: {
    backgroundColor: 'white',
    zIndex: 999,
    position: 'absolute',
    top: '180%',
    left: 0,
    right: 0,
    padding: 8,
    borderRadius: 4,
    elevation: 3,
  }, listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

})