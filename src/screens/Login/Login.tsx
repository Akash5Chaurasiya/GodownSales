import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity ,Button} from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useAuthContext } from '../../auth/authorization/AuthGuard';
import { isPhoneNumber, isValidateEmail } from './Validations/Validate';
import login from './services/login';
import Navbar from '../../components/navbar/Navbar';
import { ImageIndex } from '../../assets/AssestsIndex';
import Feather from 'react-native-vector-icons/Feather';
import LoadingButton from '../../components/button/Button';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification'
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal'

export interface RIAuthGuard {
    children: React.ReactNode;
}
const Login = ({navigation}:any) => {
    const auth = useAuthContext();
    const [isOffline, setOfflineStatus] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: '',
        showPasswords: false,
        isLoading: false,
        isOffline: false,
    })
    const togglePasswordVisibility = () => {
        setState(prevState => ({ ...prevState, showPasswords: !prevState.showPasswords }));
    }
    const handleEmailChange = (text: string) => {
        setState((prevState) => ({
            ...prevState,
            email: text
        }))
    }
    const handlePasswordChange = (text: string) => {
        setState((prevState) => ({
            ...prevState,
            password: text
        }))
    }
    const handleLogin = async () => {
        const isEmail = isValidateEmail(state.email);
        const isPhone = isPhoneNumber(state.email);
        const data: any = isEmail ? { email: state.email, password: state.password } : { phone: state.email, password: state.password }
        if (!data) {
            console.error("Invalid email or PhoneNumber");
            return;
        }
        try {
            setState(prevState => ({ ...prevState, isLoading: true }));
            const res = await login(data);
            console.log(res);
            console.log("Calling Auth", auth.actions.login(res.data.loginData));
            setState(prevState => ({ ...prevState, isLoading: false }));
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "success",
                textBody: 'login successful',
              })
        } catch (error) {
            setState(prevState => ({ ...prevState, isLoading: true }));
            console.warn(error);
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: 'Please Try again !',
              })
            setState(prevState => ({ ...prevState, isLoading: false }));
        }
    }
    const Button = ({ children, ...props }: any) => (
        <TouchableOpacity style={styles.button1} {...props}>
          <Text style={styles.buttonText1}>{children}</Text>
        </TouchableOpacity>
      );
    // const NoInternetModal = ({ show, onRetry, isRetrying }: any) => (
    //     <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
    //       <View style={styles.modalContainer}>
    //         <Text style={styles.modalTitle}>Connection Error</Text>
    //         <Text >
    //           Oops! Looks like your device is not connected to the Internet. ( उफ़! ऐसा लगता है कि आपका उपकरण इंटरनेट से कनेक्ट नहीं है. )
    //         </Text>
    //         <Button onPress={onRetry} disabled={isRetrying}>
    //           Check your Connectivity
    //         </Button>
    //       </View>
    //     </Modal>
    //   );
     
    //   useLayoutEffect(() => {
    //     const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
    //       const offline = !(state.isConnected && state.isInternetReachable);
    //       setOfflineStatus(offline);
    //       console.log("____________________________________", offline)
          
    //     });
    //     return () => removeNetInfoSubscription();
    //   }, [navigation]);
    return (
        <View>
            <View>
                <Navbar />
            </View>
            <View style={{ alignSelf: 'center', marginTop: '30%' }}>
                <Image source={ImageIndex.User} style={styles.logoIcon} />
                <Text style={{ width: 75, height: 28, fontFamily: 'Inter', fontWeight: '800', fontSize: 24, lineHeight: 28, color: '#005D7F', marginLeft: '5%', marginTop: '5%' }}>LOGIN</Text>
            </View>
            <View style={{ marginLeft: '10%', margin: '5%' }}>
                <View style={{}}>
                    <Text style={styles.InputText}>EmployeeId</Text>
                    <View style={{}}>
                        <TextInput
                            style={styles.InputBox}
                            value={state.email}
                            onChangeText={handleEmailChange}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.InputText}>Password</Text>
                    <View style={styles.passwordInputWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            value={state.password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={!state.showPasswords}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={togglePasswordVisibility}
                        ><Feather
                                name={state.showPasswords ? "eye-off" : "eye"}
                                size={18}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: '#005D7F', fontFamily: 'Inter', fontWeight: '300', lineHeight: 20, alignSelf: 'center', margin: 29 }}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <LoadingButton
                        title='Login'
                        onPress={handleLogin}
                        isLoading={state.isLoading}
                        buttonStyle={styles.customButtonStyle}
                        textStyle={styles.customButtonTextStyle}
                    />
                </View>
            </View>
            {/* <NoInternetModal
        show={isOffline}
        isRetrying={isLoading}
      /> */}
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    logoIcon: {
        width: Dimensions.get('window').height * 0.14,
        height: Dimensions.get('window').height * 0.14,
    },
    InputText: {
        width: 84,
        height: 16,
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16,
        color: '#21A0C3',
    },
    InputBox: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#666666',
        borderRadius: 5,
        paddingHorizontal: 10,
        // paddingHorizontal: '38%',
        width: '95%'
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#666666',
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '95%'
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 9,
        color: 'black',

    },
    eyeButton: {
        padding: 8,
    },
    container: {
        width: '95%',
        marginTop: '5%',
    },
    customButtonStyle: {
    },
    customButtonTextStyle: {
        paddingVertical: 8
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
      },
      modalTitle: {
        fontSize: 22,
        fontWeight: '600',
      },
      button1: {
        backgroundColor: "#283093",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
      buttonText1: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },
})