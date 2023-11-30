import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { Text } from "react-native";
import Login from "../../screens/Login/Login";
import RoleIndex from "./RoleIndex";
import LoadingState from "../../components/LoadingState/LoadingState";
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
    useLayoutEffect(() => {
        const initializeAuthData = async () => {
            try {
                const loginData = await AsyncStorage.getItem('auth');
                console.log("loginData", loginData);
                if (loginData) {
                    const loginDataParsed = JSON.parse(loginData) as Auth.LoginData;
                    setState(loginDataParsed);
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
        setState(null);
    }
    const handleLogin = async (d: Auth.LoginData) => {
        await AsyncStorage.setItem('auth', JSON.stringify(d));
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