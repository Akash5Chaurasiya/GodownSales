import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import FlatlistComp from '../../components/FlatlistComp/FlatlistComp'
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux'
import { RadioButton } from 'react-native-paper';
import { getAllSalesSlipAsync } from '../../redux/Slice/sales';

const Sales = ({navigation}:any) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = React.useState<string | undefined>();
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    // setShow(true);
  }, []);


  const photo = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

  useEffect(() => {
    dispatch(getAllSalesSlipAsync());
  }, [])

  const pendingSalesList  = useSelector((state:any)=>state.sales.salesSlip)
  const salesList = pendingSalesList?.filter((sales :any)=> sales.status ==='pending')
  
  console.log("----------------------today", pendingSalesList)

  const salesNumbers : any=[];
  salesList?.forEach((sales:any , index:any)=>{
    const salesNumber = sales.salesOrder;
    salesNumbers.push({salesNumber});
  })
console.log("salesnummm", salesNumbers)


  const handleSubmit = () => {
    setShow(false);
    setText('');
  };

  const textstring = text?.toString();
  const searchres = salesNumbers?.filter((sales: any) => {
    const includesText = sales.salesNumber.includes(textstring);
  
    return includesText;
  });

  console.log("search res", searchres)
  const handleSelectRadio = (name: any) => {
    console.log("name", name)
    setSelectedItem(name);
    setShow(false)
  };
  console.log("selected from opt on sales", selectedItem)

  const filteredData = salesList?.filter((sales: any) => {
    // Check if the purchaseOrder array includes the selected item
    return sales?.salesOrder?.includes(selectedItem);
  });
  const dataList = selectedItem && text ? filteredData : salesList;
  console.log("Filtered Data:", filteredData);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <Navbar />
      <View>
        <Text className='text-center text-xl font-extrabold m-5 text-black'>Choose Sales Number</Text>
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
                        }}>{item.salesNumber}</Text>
                        <RadioButton.Android
                          value={item.salesNumber}
                          status={selectedItem === item.salesNumber ? 'checked' : 'unchecked'}
                          onPress={() => handleSelectRadio(item.salesNumber)}
                        />
                      </View>
                    )}
                  />
                </SafeAreaView>
              </View>
            )}



          </View>

          <TouchableOpacity onPress={() => navigation.navigate("SalesScanQr")}>
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
            renderItem={({ item }) => (

              <FlatlistComp
                photo={photo}
                qrCode={item.qrCode}

                dateTime={item.createdAt}
                status={item.status}
                productNumber={item.salesOrder}
              // productName={item.productName}

              />
            )}
          />

        </View>



      </View>
    </View>
  )
}

export default Sales

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
    color:'black'
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


