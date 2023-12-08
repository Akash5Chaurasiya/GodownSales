import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';

import { RadioButton } from 'react-native-paper';
import { getAllPurchaseSlipAsync } from '../../redux/Slice/purchaseSlice';

const SearchComponent = ({ }: any) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(false);
  const [show, setShow] = useState(true);
  const [text, setText] = React.useState<string | undefined>();
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    setShow(true);
  }, []);

  
  useEffect(()=>{
    dispatch(getAllPurchaseSlipAsync());

 },[])

const purchaseList = useSelector((state:any)=>state.purchase.purchaseSlip)
console.log("----------------------------=on search ", purchaseList)


const purchaseNumbers:any= [];

purchaseList?.forEach((purchase:any, index:any) => {
  // Assuming "purchaseOrder" is the purchase nuer
  const purchaseNumber = purchase.purchaseOrder[0];
  console.log("mmmmmmmm", purchaseNumber)
  purchaseNumbers.push({  purchaseNumber });
});

console.log('Purchase Numbers:', purchaseNumbers);

  console.log('textttt---------------------------->', text, show);
  const handleSubmit = () => {
    setShow(false);
    setText('');

    // setShow(true)
  };

  interface Purchaser {
    item: string;
  }

  const purchaserNumber: Purchaser[] = [
    {
      "item": '1123421'
    },
    {
      "item": '234113'
    },
    {
      "item": '543210'
    },
    {
      "item": '987654'
    },
    {
      "item": '123456'
    }
  ];
  const textstring = text?.toString();

  const searchres = purchaseNumbers.filter((purchaser: any) => {
    const includesText = purchaser.purchaseNumber.includes(textstring);
    console.log('Includes Text:', includesText);
    return includesText;
  });
console.log("search res", searchres)
  const handleSelectRadio = (name: any) => {
    setSelectedItem(name);
  };

  console.log("searchres--------------->today", searchres)
  return (
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
                    value={item.item}
                    status={selectedItem === item.item ? 'checked' : 'unchecked'} 
                    onPress={() => handleSelectRadio(item.item)} 
                  />
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      )}



    </View>
  );
};

export default SearchComponent;

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
});
