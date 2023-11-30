import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    FlatList, Alert, ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import shelfSlice from '../../redux/Slice/shelfSlice';

import { getAllShelfAsync } from '../../redux/Slice/shelfSlice';
import Modal from 'react-native-modal'
import { getAllAlisleAsync } from '../../redux/Slice/aisleSlice';
import { RadioButton } from 'react-native-paper';
import SearchComponent from '../../components/searchBar/SearchBar';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';



const Assign = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    // const [checkedItems, setCheckedItems] = useState<any>({});
    const [listItem, setListItem] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [searchQueryA, setSearchQueryA] = useState('');
    const [isSearchActiveA, setIsSearchActiveA] = useState(false);
    const [checkedItems, setCheckedItems] = useState<any>({});

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemShelf, setSelectedItemShelf] = useState(null);
    const [loading, setLoading] = useState(false);


    console.log("selected item------------------------------------ ", selectedItem)

    useEffect(() => {
        dispatch(getAllShelfAsync());
        // dispatch(getAllAlisleAsync("shelf1"))

    }, []);
    const suggestions = useSelector((state: any) => state.shelf.allslices)
    const shelfData = suggestions?.map((item: any) => ({
        shelfName: item.shelfName,
        shelfCode: item.shelfCode,
    }));

    const filteredSuggestions = shelfData?.filter((suggestion: any) =>
        suggestion.shelfName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredShelfCodes = filteredSuggestions?.map((suggestion: any) => ({
        shelfName: suggestion.shelfName,
        shelfCode: suggestion.shelfCode,
    }));

    const initialCheckedState: any = {};
    filteredSuggestions?.forEach((suggestion: any) => {
        initialCheckedState[suggestion.shelfName] = false;
    });

    const handleCheckboxToggle = (shelfName: string, shelfCode: string) => {
        setCheckedItems((prevCheckedItems: any) => {

            const newCheckedItems = { ...prevCheckedItems };
            newCheckedItems[shelfName] = !newCheckedItems[shelfName];

            console.log('Updated Checked Items:', newCheckedItems);

            return newCheckedItems;
        });
    };
    // console.log("checkedite----------------", checkedItems)
    // const checkedItemsArray = Object.entries(selectedItemShelf)
    // .filter((shelfName) => isChecked)
    // .map(([shelfName, _]) => ({
    //     shelfName,
    //     shelfCode: shelfData.find((item:any) => item.shelfName === shelfName)?.shelfCode || '',
    // }));
    const checkedItemsArray = selectedItemShelf
        ? [
            {
                shelfName: selectedItemShelf,
                shelfCode: shelfData?.find((item: any) => item.shelfName === selectedItemShelf)?.shelfCode || '',
            },
        ]
        : [];
    const handleDeleteItem = (shelfName: string) => {
        // Remove the item from your data source
        // const updatedCheckedItems = { ...checkedItems };
        // delete updatedCheckedItems[shelfName];
        setCheckedItems(null);
        setSelectedItemShelf(null);


    };
    const handleCrossIconPress = () => {
        setSearchQuery(''); // Reset search query
        setIsSearchActive(false); // Show suggestions
    };

    //aisle 

    const suggestionAisle = useSelector((state: any) => state.aisle.allaisle)
    const aisleName = suggestionAisle?.map((item: any) => item.aisleName)
    console.log("aisleData--------------------------------------- ", suggestionAisle)
    let aisleId: any;
    let aisleCode: any, shelfCode: any;
    const findAisleDetails = (aisleName: any) => {
        const selectedAisle = suggestionAisle?.find((aisle: any) => aisle.aisleName === aisleName);
        console.log("data of particular asile ------------------------------------------>", selectedAisle)

        if (selectedAisle) {
            aisleId = selectedAisle._id;
            shelfCode = selectedAisle.shelf.shelfCode;
            aisleCode = selectedAisle.aisleCode;

            return { aisleId, shelfCode, aisleCode };
        }

        return null; // Return null if aisle is not found
    };

    const selectedItemAisleDetails = findAisleDetails(selectedItem);

    const handleSelect = (name: any) => {
        setSelectedItem(name);
    };
    const handleSelectShelf = (name: any) => {
        setSelectedItemShelf(name);
        setIsSearchActive(false)
        setSearchQuery('');

    };
    const hideModal = () => {
        setShowModal(false);

    };

    const handleButton = () => {
        setShowModal(false);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navbar />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, alignItems: 'center', }}>

                    <View style={styles.view1}>
                        <View style={styles.searchBarContainer}>
                            <Feather
                                name="search"
                                size={18}
                                color={'black'}
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search "
                                onChangeText={text => {
                                    setSearchQuery(text), setIsSearchActive(true); setSelectedItemShelf(null)
                                }}
                                value={searchQuery}
                                placeholderTextColor="gray"
                            />
                            {/* {isSearchActive ? <ActivityIndicator size='small' color='blue' style={{ marginRight: '4%' }} /> :  */}
                            <TouchableOpacity onPress={handleCrossIconPress}>
                                <Feather
                                    name="x"
                                    size={18}
                                    color={'black'}
                                    style={styles.searchIcon}
                                />
                            </TouchableOpacity>
                            {/* } */}

                        </View>
                        {/* <SearchComponent
          setSearchQuery={setSearchQuery}
          handleCrossIconPress={handleCrossIconPress}
          onPress ={()=>setSearching(false)}

        /> */}

                        {isSearchActive && filteredShelfCodes?.length > 0 && (
                            <ScrollView style={styles.suggestionsContainer}>
                                {filteredShelfCodes.map((suggestion: any, index: any) => (
                                    <View key={index} style={styles.suggestionItem}>
                                        <Text>{suggestion.shelfName}</Text>
                                        {/* <Checkbox.Android
                                    status={
                                        checkedItems[suggestion.shelfName] ? 'checked' : 'unchecked'
                                    }
                                    onPress={() => handleCheckboxToggle(suggestion.shelfName, suggestion.shelfCode)}
                                /> */}
                                        <RadioButton.Android
                                            value={suggestion.shelfName}
                                            status={selectedItemShelf === suggestion.shelfName ? 'checked' : 'unchecked'} // Check or uncheck the RadioButton based on the selectedItem
                                            onPress={() => handleSelectShelf(suggestion.shelfName)} // Handle selection
                                            style={{}}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        )}



                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Text style={{ color: '#005D7F', fontWeight: '700', fontSize: 23, marginBottom: '6%' }}>
                                Shelf List
                            </Text>
                            <FlatList
                                data={checkedItemsArray}
                                keyExtractor={(item) => item.shelfName}
                                renderItem={({ item }: any) => (
                                    // console.log('item', item),
                                    (
                                        <TouchableOpacity onPress={() => { setShowModal(true); dispatch(getAllAlisleAsync(item.shelfCode)) }} style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, borderWidth: 1, padding: 12, borderColor: '#94A3B8', alignItems: 'center' }}>
                                            <Text style={{ color: '#118EB1', fontSize: 20 }}>{item.shelfName}</Text>

                                            <TouchableOpacity onPress={() => handleDeleteItem(item.shelfName)}>
                                                <Feather
                                                    name="trash-2"
                                                    size={20}
                                                    color={'black'}
                                                    style={styles.searchIcon}
                                                />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    )
                                )}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (selectedItem) {
                                navigation.navigate('scanAssignQr', {
                                    aisleId: aisleId,
                                    aisleCode: aisleCode,
                                    shelfCode: shelfCode,
                                });
                            } else {
                                // Show an alert if dataAisleId or dataAisleId._id is null

                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: 'Please select an aisle before assigning a QR code',
                                })
                            }
                        }} style={{ backgroundColor: 'white', borderWidth: 2, borderColor: '#005D7F', width: '98%', padding: '4%', borderRadius: 10, elevation: 3, marginBottom: '10%' }}>
                        <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 17, justifyContent: 'center', textAlign: 'center' }}>Assign Qr code -</Text>
                    </TouchableOpacity>


                </View>
                <Modal isVisible={showModal} animationInTiming={600} style={styles.modal} onBackdropPress={hideModal}
                    onBackButtonPress={hideModal}>
                    <View style={[styles.modalContainer, { height: '65%', }]}>


                        <View style={{ ...styles.searchBarContainer, width: '90%', justifyContent: 'center', }}>
                            <Feather
                                name="search"
                                size={18}
                                color={'black'}
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search Aisle.."
                                onChangeText={text => {
                                    setSearchQueryA(text)
                                }}
                                value={searchQuery}
                                placeholderTextColor="gray"
                            />
                            <TouchableOpacity onPress={handleCrossIconPress}>
                                <Feather
                                    name="arrow-right"
                                    size={18}
                                    color={'black'}
                                    style={styles.searchIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', }}>


                            <FlatList
                                data={aisleName}
                                renderItem={({ item }) => (
                                    // console.log(item),
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 3, marginTop: '2%' }}>
                                        <Text>{item}</Text>
                                        <RadioButton.Android // Use RadioButton.Android for Android platform
                                            value={item}
                                            status={selectedItem === item ? 'checked' : 'unchecked'} // Check or uncheck the RadioButton based on the selectedItem
                                            onPress={() => handleSelect(item)} // Handle selection
                                            style={{}}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                        <TouchableOpacity onPress={handleButton} style={{ borderRadius: 4, paddingHorizontal: '15%', paddingVertical: '3%', marginTop: '70%', backgroundColor: '#E2F6F7', width: '90%', elevation: 3 }}>
                            <Text style={{ color: '#005D7F', textAlign: 'center', fontWeight: '700', fontSize: 20 }}>Done</Text></TouchableOpacity>

                    </View>

                </Modal>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Assign;

const styles = StyleSheet.create({
    searchIcon: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        color: '#333',
    },
    searchInput: {
        fontSize: 16,
        height: 48,
        flex: 1,
        color: 'black',
    },
    searchBarContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#94A3B8',
        // height: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative'
    },
    suggestionsContainer: {
        maxHeight: '50%',
        borderWidth: 0.4,
        borderRadius: 10,
        zIndex: 10001,

        // borderTopRightRadius:2,
        // borderTopLeftRadius:2
        marginTop: '2%',
    },
    suggestionItem: {
        padding: '5%',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedSuggestion: {
        backgroundColor: '#e6f7ff', // Highlight the selected suggestion
    },
    container: {
        // flexDirection: 'column',
        // justifyContent: 'space-around',
        // alignItems: 'center',
    },
    view1: {
        padding: 25,
        marginBottom: '1%',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
        width: '98%',
        height: '90%',
        flexDirection: 'column',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
        borderRadius: 10
    },
});
