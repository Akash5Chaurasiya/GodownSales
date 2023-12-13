import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/navbar/Navbar'
import Feather from 'react-native-vector-icons/Feather';


const ReconAisleDes = ({ navigation }: any) => {

  const dataAfterScan = useSelector((state: any) => state.aisle.scanaisle)

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Navbar />
      <View style={styles.view1}>
        <View className='flex flex-row justify-between '>
          <Text style={styles.bar}>Aisle Name: {dataAfterScan.aisleName}</Text>
          <Text style={styles.bar}>Aisle Code: {dataAfterScan.aisleCode}</Text>
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
            borderBottomWidth: 1
          }}
        />

        <View>
          <FlatList
            data={dataAfterScan.itemData}
            keyExtractor={(item, index) => index.toString()}
            style={{ maxHeight: 390 }}
            renderItem={({ item }) => {

              const lastEntry = item.item.changeLog[item.item.changeLog.length - 1];

              const lastDate = lastEntry ? new Date(lastEntry.date).toLocaleDateString() : null;

              return (
                <View style={styles.card}>
                  <View className='flex flex-row justify-between'>
                    <View className='flex flex-row '>
                      <Image source={{ uri: item.item.images[0] }} style={styles.photo} />
                      <View className='flex flex-col ml-1'>

                        <Text style={{ color: '#005D7F', fontWeight: '600', fontSize: 16, }}>Quantity Present</Text>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>{item.item.unit.weight}</Text>
                      </View>
                    </View>
                    <View>
                      <Feather
                        name="aperture"
                        size={20}
                        color={'black'}
                        onPress={() => navigation.navigate("ReconAisleScan")}
                      />
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
              <TouchableOpacity style={{ width: '85%', backgroundColor: '#005D7F', padding: '4%', borderRadius: 9, marginLeft: '8%' }} >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Send Request</Text>
              </TouchableOpacity>


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