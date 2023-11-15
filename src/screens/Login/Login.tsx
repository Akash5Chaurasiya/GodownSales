import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAuthContext } from '../../auth/authorization/AuthGuard';
import { isPhoneNumber, isValidateEmail } from './Validations/Validate';
import login from './services/login';
import Navbar from '../../components/navbar/Navbar';

export interface RIAuthGuard {
    children: React.ReactNode;
}
const Login = () => {
    const auth = useAuthContext();
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
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View>
            <View>
                <Navbar />
            </View>
            <Text >Login</Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})