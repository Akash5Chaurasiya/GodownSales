import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { ImageIndex } from '../../assets/AssestsIndex'
import { useAuthContext } from '../../auth/authorization/AuthGuard'
import Internet from '../InternetCheck/Internet'
import Feather from 'react-native-vector-icons/Feather'

const Navbar = () => {
    const[isConnected , setIsConnected] = useState(false);
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
    console.log("__authdata",authData);
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
                            <View style={{ flexDirection: 'row' , justifyContent:'space-between'}}>
                              
                                <View style={styles.logoWrapper}>
                                    <Image source={ImageIndex.logo} resizeMode="cover" style={styles.logoIcon} />
                                    <View style={{flexDirection:'column'}}>
                                    <Text style={{ color: '#005D7F', fontSize: 17.5, fontWeight: "500", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center', marginLeft: 6.13 }}>Chawla Ispat</Text>
                                    <Text  style={{ color: '#005D7F', fontSize: 14, fontWeight: "300", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center', marginLeft: 6.13 }}>version no. 1.4</Text>

                                </View>
                              
                  
                  {/* {isConnected==true? <Text style={{fontWeight:'600',marginLeft:'8%', color:'black'}}>cellular</Text>:<Text style={{fontWeight:'600',marginLeft:'8%'}}>No Net</Text>} */}
                 
             
                                
                                </View >
                                <View className='flex flex-col, '>
                                    <View className='flex flex-row'>
                                {isConnected==true?
                  null:<Feather
                
                  color={'red'}
                  name="wifi-off"
                  size={18}
                  style={{marginLeft:9, marginRight:2}}
              />}
                                <TouchableOpacity onPress={() => actions.logout()}>
                                     <Text style={{color:'#005D7F', fontSize: 14, fontWeight: "300", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center'}}>Logout</Text>
                                </TouchableOpacity>
                                </View>
                                    <Text style={{color:'#005D7F',fontSize: 14, fontWeight: "300", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center',}}>{authData?.name}</Text>
                                    </View>
{/*                                 
                                <TouchableOpacity onPress={() => actions.logout() } >
                                    <Image source={authData.image} resizeMode="cover" style={{width: Dimensions.get('window').height * 0.058,height: Dimensions.get('window').height * 0.058,alignSelf:'flex-end'}} />
                                    <Text style={{color:'#005D7F', marginBottom:'20%', textAlignVertical:'center'}}>Logout</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>)
                    :
                    (<View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.logoWrapper}>
                                <Image source={ImageIndex.logo} resizeMode="cover" style={styles.logoIcon} />
                                <Text style={{ color: '#005D7F', fontSize: 17.5, fontWeight: "500", fontFamily: "Inter", lineHeight: 24.51, textAlign: 'center', marginLeft: 6.13 }}>Chawla Ispat</Text>
                               
                            </View>
                        </View>
                    </View>)
            }
             <Internet isConnected= 
        
        {isConnected} setIsConnected={setIsConnected}/>
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
        justifyContent: "center",
        // backgroundColor:'yellow',
    },
    logoIcon: {
        width: Dimensions.get('window').height * 0.058,
        height: Dimensions.get('window').height * 0.058,
    },
})