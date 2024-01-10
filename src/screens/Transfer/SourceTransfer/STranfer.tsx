import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, SafeAreaView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTranferAsync } from '../../../redux/Slice/transfer'
import Feather from 'react-native-vector-icons/Feather';
import FlatlistComp from '../../../components/FlatlistComp/FlatlistComp'
import { RadioButton } from 'react-native-paper';


const STranfer = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = React.useState<string | undefined>();
  const [selectedItem, setSelectedItem] = useState(null);
  const tranfer = useSelector((state: any) => state.transfer.sourceTranfer)
  console.log("-----------------------", tranfer)
  //pending tranfer
  const tranferList = tranfer?.filter((tranfer: any) => tranfer.status === 'pending')
  const voucherIds: any = [];
  tranferList?.forEach((v: any, index: any) => {

    const vNumber = v._id;
    console.log("mmmmmmmm----------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..", vNumber)
    voucherIds.push({ vNumber });
  });

  // console.log("searchhhhhhhhhh", searchres)
  console.log("idssssssssssssss", voucherIds)
  const photo = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  useEffect(() => {
    dispatch(getAllTranferAsync())
  }, [])
  const handleSubmit = () => {
    setShow(false);
    setText('');
  };
  const textstring = text?.toString();
  console.log("textstring of vvvvvvvvvv", textstring)
  const searchres = voucherIds?.filter((v: any) => {
    const includesText = v?.vNumber?.includes(textstring);
    console.log('Includes Text:', includesText);
    return includesText;
  });
  console.log("search resssssssssssssssssss", searchres)
  const handleSelectRadio = (name: any) => {
    console.log("name", name)
    setSelectedItem(name);
    setShow(false)
  };
  const filteredData = tranferList?.filter((v: any) => {
    const vOrderId = v?._id; // Access _id inside purchaseOrder
    return vOrderId === selectedItem;

    // console.log("ttttttttttttttttttttttttttttttt", purchase?.purchaseOrder?.includes(selectedItem))
  });
  const dataList = selectedItem && text ? filteredData : tranferList

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(getAllTranferAsync())
    setRefreshing(false);
};
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Navbar />
      <View>
        <Text className='text-center text-xl font-extrabold m-5 text-black'> Choose Voucher list</Text>
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
                        }}>{item.vNumber}</Text>
                        <RadioButton.Android
                          value={item.vNumber}
                          status={selectedItem === item.vNumber ? 'checked' : 'unchecked'}
                          onPress={() => handleSelectRadio(item.vNumber)}
                        />
                      </View>
                    )}
                  />
                </SafeAreaView>
              </View>
            )}



          </View>

          <TouchableOpacity onPress={() => navigation.navigate("TransferScanQr")}>
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
                qrCode={item.Qr}
                numberName={"Voucher Id"}
                dateTime={item?.sourceGodown?.createdAt}
                status={item.status}
                productNumber={item._id}
                typeOftransfer={item.typeOfTransfer}
              // productName={item.productName}

              />
            )}
          />

        </View>

      </View>

    </View>
  )
}

export default STranfer

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
    width: '90%',
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