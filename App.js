import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthGuard from './src/auth/authorization/AuthGuard'
import { NavigationContainer } from '@react-navigation/native'
import Dashboard from './src/screens/Dashboard'
import Navbar from './src/components/navbar/Navbar'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Assign from './src/screens/AssignQr/Assign'
import Transfer from './src/screens/Transfer/Transfer'
import History from './src/screens/History/History'
import Feather from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const App = () => {
  const Home = () => {
    return (
      <Stack.Navigator initialRouteName='dashboard'>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="navbar"
          component={Navbar}
        />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <AuthGuard>
        <Tab.Navigator
          initialRouteName="Home"
          barStyle={{
            height: '8.5%',
            backgroundColor:"#E0F3EE"
          }}
          shifting={true}>
          <Tab.Screen
            name="Home"
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" size={25} color={color} />
              ),
            }}
            component={Home}
          />
          <Tab.Screen
            name="Assign"
            options={{
              headerShown: false,
              tabBarLabel: 'Assign',
              tabBarIcon: ({ color, size }) => (
                <Feather name="qrcode" size={25} color={color} />
              ),
            }}
            component={Assign}
          />
          <Tab.Screen
            name="Transfer"
            options={{
              headerShown: false,
              tabBarLabel: 'Transfer',
              tabBarIcon: ({ color, size }) => (
                <Feather name="retweet" size={25} color={color} />
              ),
            }}
            component={Transfer}
          />
          <Tab.Screen
            name="History"
            options={{
              headerShown: false,
              tabBarLabel: 'History',
              tabBarIcon: ({ color, size }) => (
                <Feather name="history" size={25} color={color} />
              ),
            }}
            component={History}
          />
        </Tab.Navigator>
      </AuthGuard>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})