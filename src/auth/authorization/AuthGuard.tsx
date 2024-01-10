import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { Text } from "react-native";
import Login from "../../screens/Login/Login";
import RoleIndex from "./RoleIndex";
import LoadingState from "../../components/LoadingState/LoadingState";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import React, {useEffect} from "react";
export interface RIAuthGuard {
    children: React.ReactNode;
}
interface AuthContextValue {
    authData: Auth.LoginData;
    actions: {
        logout: () => Promise<void>;
        login: (data: Auth.LoginData) => Promise<void>;
    }
}
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);
export const useAuthContext = () => useContext(AuthContext);
export default function AuthGuard(props: RIAuthGuard) {
    const { children } = props;
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<Auth.LoginData | null>(null);
    console.log("state",state);


    
  const checkAutoLogout = async () => {
    try {
      const loginTimeStr = await AsyncStorage.getItem('loginTime');
      if (loginTimeStr) {
        const loginTime = new Date(loginTimeStr);
        const currentTime = new Date();
        const elapsedMilliseconds = currentTime.getTime() - loginTime.getTime();
        const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);
        
        if (elapsedHours >= 6) {
          // Auto logout if more than 6 hours have passed
          await handleLogout();
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "success",
            textBody: 'Auto logout due to inactivity',
          });
        }
      }
    } catch (error) {
      console.log("Error checking auto logout", error);
    }
  };

  useEffect(() => {
    checkAutoLogout();
  }, []);
    useLayoutEffect(() => {
        const initializeAuthData = async () => {
            try {
                const loginData = await AsyncStorage.getItem('auth');
                console.log("loginData", loginData);
                if (loginData) {
                    const loginDataParsed = JSON.parse(loginData) as Auth.LoginData;
                    setState(loginDataParsed);
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "success",
                        textBody: 'login successful',
                      })
                      await AsyncStorage.setItem('loginTime', new Date().toISOString());
          
                }
            } catch (error) {

                console.log("Error Fetching loginData", error);
                
            } finally {
                setLoading(false);
            }
        }
        initializeAuthData();
    }, [])
    const handleLogout = async () => {
        await AsyncStorage.removeItem('auth');
        await AsyncStorage.removeItem('loginTime');
        setState(null);
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "success",
            textBody: 'logout successful',
          })

    }
    const handleLogin = async (d: Auth.LoginData) => {
        await AsyncStorage.setItem('auth', JSON.stringify(d));
        await AsyncStorage.setItem('loginTime', new Date().toISOString());
        setState(d);
    }
    if (loading) {
        return <LoadingState/>
    }
    const contextValue: AuthContextValue = {
        authData: state || {
            loginData: {
                success: false,
                userId: '',
                role: RoleIndex.UNKNOWN,
                name: '',
                email: '',
                phoneNumber: '',
            }
        },
        actions: {
            logout: handleLogout,
            login: handleLogin
        }
    }
    if (state) {
        return (
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        )
    }
    return (
        <AuthContext.Provider value={contextValue}>
            <Login />
        </AuthContext.Provider>
    )
}