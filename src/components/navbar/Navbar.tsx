import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ImageIndex } from '../../assets/AssestsIndex'
import { useAuthContext } from '../../auth/authorization/AuthGuard'

const Navbar = () => {
    type Authenticated={
        email: string,
        image:string,
        maxAge: number,
        name:string,
        phoneNumber:string,
        role:string,
        success:boolean,
        userId:string
    }
    const { authData,actions }:any = useAuthContext();
    console.log(authData);
    return (
        <View>
            <StatusBar
                backgroundColor="#fafafa"
                barStyle="dark-content"
            />
            {
                authData ?
                    (<View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              
                                <View style={styles.logoWrapper}>
                                    <Image source={ImageIndex.logo} resizeMode="cover" style={styles.logoIcon} />
                                    <View style={{flexDirection:'column'}}>
                                    <Text style={{ color: '#005D7F', fontSize: 17.5, fontWeight: "500", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center', marginLeft: 6.13 }}>Chawla Ispat</Text>
                                    <Text  style={{ color: '#005D7F', fontSize: 14, fontWeight: "300", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center', marginLeft: 6.13 }}>version no. 1.1</Text>
                                </View>
                                </View>
                                
                                <TouchableOpacity onPress={() => actions.logout() } >
                                    <Image source={authData.image} resizeMode="cover" style={{width: Dimensions.get('window').height * 0.058,height: Dimensions.get('window').height * 0.058,alignSelf:'flex-end'}} />
                                    <Text style={{color:'#005D7F', marginBottom:'20%', textAlignVertical:'center'}}>{authData.name}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)
                    :
                    (<View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.logoWrapper}>
                                <Image source={ImageIndex.logo} resizeMode="cover" style={styles.logoIcon} />
                                <TextInput style={{ color: '#005D7F', fontSize: 17.5, fontWeight: "500", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center', marginLeft: 6.13 }}>Chawla Ispat</TextInput>
                               
                            </View>
                        </View>
                    </View>)
            }
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
        justifyContent: "center"
    },
    logoIcon: {
        width: Dimensions.get('window').height * 0.058,
        height: Dimensions.get('window').height * 0.058,
    },
})