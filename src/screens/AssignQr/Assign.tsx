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
import { SafeAreaView } from 'react-native-safe-area-context';



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
    const [selectedItemShelfList, setSelectedItemShelfList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = React.useState(false);
    const [text, setText] = React.useState<string>('');
    const [show, setShow] = useState(false);
    console.log("TEXT, SHOW", text, show)

    useEffect(() => {
        // setShow(true);
        dispatch(getAllShelfAsync());


    }, []);
    const suggestions = useSelector((state: any) => state.shelf.allslices)

    const shelfData = suggestions?.map((item: any) => ({
        shelfName: item.shelfName,
        shelfCode: item.shelfCode,
    }));
    // console.log("_---------------------------------_", shelfData)


    const handleSubmit = () => {
        setShow(false);
        setText('');
    };

    const filteredSuggestions = shelfData?.filter((suggestion: any) =>
        suggestion.shelfName.toLowerCase().includes(text.toLowerCase())
    );

    const filteredShelfCodes = filteredSuggestions?.map((suggestion: any) => ({
        shelfName: suggestion.shelfName,
        shelfCode: suggestion.shelfCode,
    }));

    console.log("filteredShelfCodes--------------------------", filteredShelfCodes)
    // const initialCheckedState: any = {};

    // filteredSuggestions?.forEach((suggestion: any) => {
    //     initialCheckedState[suggestion.shelfName] = false;
    // });

    // const filteredData = shelfData?.filter((shelf: any) => shelf.shelfName === selectedItemShelf)
    // console.log("filtereddata_------------------------_", filteredData)
    const dataList = text ? filteredShelfCodes : shelfData
    const handleSelectShelf = (name: any) => {
        setSelectedItemShelf(name);
        setShow(false)

    };

    // const handleDeleteItem = (shelfName: string) => {
    //     setCheckedItems(null);
    //     setSelectedItemShelf(null);
    // };
    const handleCrossIconPress = () => {
        setSearchQuery(''); // Reset search query
        setIsSearchActive(false); // Show suggestions
    };

    //aisle modal start 


    const suggestionAisle = useSelector((state: any) => state.aisle.allaisle)
    const aisleName = suggestionAisle?.map((item: any) => item.aisleName)
    console.log("aisleData--------------------------------------- ", aisleName)
    // console.log("selected shelf------------------", selectedItemShelf)
    console.log("shelf nameselected in list", selectedItemShelfList)
    console.log("itemaisle name-------------------", selectedItem)

    let aisleId: any, aisleCode: any, shelfCode: any, isAlredyAssign: any;
    const findAisleDetails = (aisleName: any) => {
        const selectedAisle = suggestionAisle?.find((aisle: any) => aisle.aisleName === aisleName);
        console.log("matching asile ------------------------------------------>", selectedAisle)
        isAlredyAssign = selectedAisle?.imageLogs;
        console.log("lengthhh-------", isAlredyAssign)
        if (selectedAisle) {
            aisleId = selectedAisle._id;
            shelfCode = selectedAisle.shelf.shelfCode;
            aisleCode = selectedAisle.aisleCode;

            return { aisleId, shelfCode, aisleCode };
        }

        return null; // Return null if aisle is not found
    };

    const selectedItemAisleDetails = findAisleDetails(selectedItem);
    console.log("navigation data", selectedItemAisleDetails)


    const handleSelect = (name: any) => {
        setSelectedItem(name);
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
                            {/* {text && show && (
                                <View style={styles.searchAssistContainer}>
                                    <ScrollView style={{ flex: 1 }}>
                                        <SafeAreaView>
                                            <FlatList
                                                // style={{ maxHeight: 350 }}

                                                data={filteredShelfCodes}
                                                keyExtractor={(item, index) => index.toString()} // Set a unique key for each item
                                                renderItem={({ item }) => (
                                                    <View style={styles.listItem}>
                                                        <Text style={{
                                                            fontFamily: 'Inter-SemiBold',
                                                            color: 'black',
                                                        }}>{item.shelfName}</Text>
                                                        <RadioButton.Android
                                                            value={item.shelfName}
                                                            status={selectedItemShelf === item.shelfName ? 'checked' : 'unchecked'}
                                                            onPress={() => handleSelectShelf(item.shelfName)}
                                                        />
                                                    </View>
                                                )}
                                            />
                                        </SafeAreaView>
                                    </ScrollView>
                                </View>
                            )} */}
                        </View>

                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Text style={{ color: '#005D7F', fontWeight: '700', fontSize: 23, marginBottom: '6%', textDecorationLine: 'underline' }}>
                                Shelf List
                            </Text>
                            <FlatList
                                data={dataList}
                                keyExtractor={(item) => item.shelfName}
                                style={{ maxHeight: '90%' }}
                                renderItem={({ item }: any) => (
                                    // console.log('item', item),
                                    (
                                        <TouchableOpacity onPress={() => { setSelectedItemShelfList(item.shelfName); setShowModal(true); dispatch(getAllAlisleAsync(item.shelfCode)) }}
                                            style={{
                                                flexDirection: 'row', justifyContent: 'space-between',
                                                borderRadius: 8, borderWidth: 1, padding: 12, borderColor: '#94A3B8',
                                                alignItems: 'center', marginBottom: '4%', 
                                                 backgroundColor: selectedItemShelfList === item.shelfName ? '#118EB1' : 'transparent',
                                           
                                            }}>
                                            <Text style={{ color: selectedItemShelfList === item.shelfName ? "white" :'#118EB1', fontSize: 18, }}>{item.shelfName}</Text>

                                            <TouchableOpacity >
                                                <Feather
                                                    name="arrow-right"
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
                    {/* <TouchableOpacity
                        onPress={() => {
                            if (selectedItem ) {

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
                        }} style={{ backgroundColor: 'white', borderWidth: 2, borderColor: '#005D7F', width: '98%', padding: '4%', borderRadius: 10, elevation: 3,  }}>
                        <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 17, justifyContent: 'center', textAlign: 'center' }}>Assign Qr code -</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => {
                            if (selectedItem) {
                                // const isAlredyAssign = selectedAisle.imageLogs;

                                if (isAlredyAssign && isAlredyAssign.length >= 1) {
                                    // If images are already assigned, prompt the user for reassignment
                                    Alert.alert(
                                        'Reassign Barcodes',
                                        'Do you want to reassign the Code?',
                                        [
                                            {
                                                text: 'No',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Yes',
                                                onPress: () => {
                                                    navigation.navigate('scanAssignQr', {
                                                        aisleId: aisleId,
                                                        aisleCode: aisleCode,
                                                        shelfCode: shelfCode,
                                                    });
                                                },
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                } else {
                                    // No images are already assigned, proceed with navigation
                                    navigation.navigate('scanAssignQr', {
                                        aisleId: aisleId,
                                        aisleCode: aisleCode,
                                        shelfCode: shelfCode,
                                    });
                                }
                            } else {
                                // Show an alert if dataAisleId or dataAisleId._id is null
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: 'Warning',
                                    textBody: 'Please select an aisle before assigning a QR code',
                                });
                            }
                        }}
                        style={{
                            backgroundColor: 'white',
                            borderWidth: 2,
                            borderColor: '#005D7F',
                            width: '98%',
                            padding: '4%',
                            borderRadius: 10,
                            elevation: 3,
                        }}
                    >
                        <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 17, justifyContent: 'center', textAlign: 'center' }}>
                            Assign Qr code -
                        </Text>
                    </TouchableOpacity>


                </View>
                <Modal isVisible={showModal} animationInTiming={600} style={styles.modal} onBackdropPress={hideModal}
                    onBackButtonPress={hideModal}>
                    <View style={[styles.modalContainer, { height: '77%', }]}>


                        {/* <View style={{ ...styles.searchBarContainer, width: '90%', justifyContent: 'center', }}>
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
                        </View> */}
                        <Text style={{ color: '#005D7F', textAlign: 'center', fontWeight: '700', fontSize: 25, textDecorationLine: 'underline' }}>Aisle List </Text>

                        <SafeAreaView style={{ width: '100%', maxHeight: '90%', marginBottom: '20%' }}>


                            {aisleName.length === 0 ? (
                                <View style={{ justifyContent: 'center', margin: '5%' }}>
                                    <Text style={{ color: 'black', fontSize: 14 }}>No aisle present :) select other shelf </Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={aisleName}
                                    style={{ margin: '4%' }}
                                    renderItem={({ item }) => (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 3, marginTop: '2%' }}>
                                            <Feather
                                                name="arrow-right-circle"
                                                size={20}
                                                color={'black'}
                                            // style={styles.searchIcon}
                                            />
                                            <Text style={{ color: 'black', fontSize: 17 }}>{item}</Text>
                                            <RadioButton.Android
                                                value={item}
                                                status={selectedItem === item ? 'checked' : 'unchecked'}
                                                onPress={() => handleSelect(item)}
                                            />
                                        </View>
                                    )}
                                />
                            )}



                        </SafeAreaView>
                        <TouchableOpacity onPress={handleButton} style={{ borderRadius: 4, paddingHorizontal: '15%', paddingVertical: '3%', backgroundColor: '#E2F6F7', width: '100%', elevation: 3, }}>
                            <Text style={{ color: '#005D7F', textAlign: 'center', fontWeight: '700', fontSize: 20 }}>Done</Text>
                        </TouchableOpacity>


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
    // searchBarContainer: {
    //     backgroundColor: 'white',
    //     borderRadius: 50,
    //     width: '100%',
    //     borderWidth: 1,
    //     borderColor: '#94A3B8',
    //     // height: '20%',
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // position: 'relative'
    // },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginLeft: '3%',
        marginRight: '3%',
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
    // container: {
    //     // flexDirection: 'column',
    //     // justifyContent: 'space-around',
    //     // alignItems: 'center',
    // },
    container: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: '#CFD3D4',
        borderRadius: 4,
        gap: 10,
        padding: 8,
        alignItems: 'center',
        position: 'relative',
        zIndex: 9999,
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
        // maxHeight: 350

    }, listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

});
