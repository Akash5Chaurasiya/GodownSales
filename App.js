import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthGuard from './src/auth/authorization/AuthGuard'
import Dashboard from './src/screens/dashboard'
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AuthGuard>
      <Stack.Navigator initialRouteName='dashboard'>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="dashboard"
          component={Dashboard}
        />
      </Stack.Navigator>
    </AuthGuard>
  )
}

export default App

const styles = StyleSheet.create({})