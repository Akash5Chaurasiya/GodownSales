import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { ImageIndex } from '../../assets/AssestsIndex'

const Navbar = () => {
    return (
        <View>
            <StatusBar
                backgroundColor="#fafafa"
                barStyle="dark-content"
            />
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.logoWrapper}>
                        <Image source={ImageIndex.logo} resizeMode="cover" style={styles.logoIcon}/>
                        <TextInput style={{color:'#005D7F',fontSize:17.5,fontWeight:"500",fontFamily:"Inter",lineHeight:24.51,textAlign:'center',marginLeft:6.13}}>Chawla Ispat</TextInput>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        // backgroundColor: 'yellow',
        borderColor: '#D9D9D9',
        borderBottomWidth: 1,
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"center"
    },
    logoIcon: {
        width: Dimensions.get('window').height * 0.058,
        height: Dimensions.get('window').height * 0.058,
    },
})