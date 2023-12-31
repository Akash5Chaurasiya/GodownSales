import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, {lazy, Suspense} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthGuard from './src/auth/authorization/AuthGuard'
import { NavigationContainer } from '@react-navigation/native'
// import Dashboard from './src/screens/Dashboard'
import Dashboard from './src/screens/dashboard.tsx'
import Navbar from './src/components/navbar/Navbar'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Assign from './src/screens/AssignQr/Assign'
import Transfer from './src/screens/Transfer/Transfer'
import History from './src/screens/History/History'
import Feather from 'react-native-vector-icons/FontAwesome5';
import ScanAssignQr from './src/screens/AssignQr/ScanAssignQr/ScanAssignQr.tsx'
import AssignAisleCamera from './src/screens/AssignQr/AssignAisleCamera/AssignAisleCamera.tsx'
import ConfirmAisleQr from './src/screens/AssignQr/ConfirmAisleQr/ConfirmAisleQr.tsx'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import Purchase from './src/screens/Purchase/Purchase.tsx'
import PurchaseCamera from './src/screens/Purchase/PurchaseCamera/PurchaseCamera.tsx'
import PurchasePage from './src/screens/Purchase/PurchasePage/PurchasePage.tsx'
import ScanPurchase from './src/screens/Purchase/ScanPurchaserAisle/ScanPurchaseAisle.tsx'
import ScanPurchaseAisle from './src/screens/Purchase/ScanPurchaserAisle/ScanPurchaseAisle.tsx'
import PurchaseConfirmAisle from './src/screens/Purchase/PurchaseConfirmAisle/PurchaseConfirmAisle.tsx'
import PurchaseAislePhoto from './src/screens/Purchase/PurchaserAislePhoto/PurchaseAislePhoto.tsx'
import Sales from './src/screens/Sales/Sales.tsx'
import SalesItemDes from './src/screens/Sales/SalesItemDes/SalesItemDes.tsx'
import SalesScanQr from './src/screens/Sales/SalesScanQr/SalesScanQr.tsx'
import SalesAisleQr from './src/screens/Sales/SalesAisleQr/SalesAisleQr.tsx'
import SalesAisleDes from './src/screens/Sales/SalesAisleDes/SalesAisleDes.tsx'
import SalesAislePhoto from './src/screens/Sales/SalesAislePhoto/SalesAislePhoto.tsx'
import Reconciliation from './src/screens/Reconciliation/Reconciliation.tsx'
import ReconScanQr from './src/screens/Reconciliation/ReconScanQr/ReconScanQr.tsx'
import SalesVerification from './src/screens/Sales/SalesVerification/SalesVerification.tsx'
import PurchaseVerification from './src/screens/Purchase/PurchaseVerification/PurchaseVerification.tsx'
import ReconAisleDes from './src/screens/Reconciliation/ReconAisleDes/ReconAisleDes.tsx'
import ReconAisleScan from './src/screens/Reconciliation/ReconAisleScan/ReconAisleScan.tsx'
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
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Purchase"
          component={Purchase}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PurchaseCamera"
          component={PurchaseCamera}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PurchasePage"
          component={PurchasePage}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ScanPurchaseAisle"
          component={ScanPurchaseAisle}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PurchaseConfirmAisle"
          component={PurchaseConfirmAisle}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PurchaseAislePhoto"
          component={PurchaseAislePhoto}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PurchaseVerification"
          component={PurchaseVerification}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Sales"
          component={Sales}
        />
       
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesScanQr"
          component={SalesScanQr}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesItemDes"
          component={SalesItemDes}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesAisleQr"
          component={SalesAisleQr}
        />
       
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesAislePhoto"
          component={SalesAislePhoto}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesAisleDes"
          component={SalesAisleDes}
        />
           <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesVerification"
          component={SalesVerification}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Reconciliation"
          component={Reconciliation}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ReconScanQr"
          component={ReconScanQr}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ReconAisleDes"
          component={ReconAisleDes}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ReconAisleScan"
          component={ReconAisleScan}
        />
      </Stack.Navigator>
    )
  }
  // const ConfirmAisleQr = lazy(()=>import('./src/screens/AssignQr/ConfirmAisleQr/ConfirmAisleQr.tsx') )
  const AssignComp = () => {
    return (
      <Stack.Navigator initialRouteName='assign'>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="assign"
          component={Assign}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="scanAssignQr"
          component={ScanAssignQr}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AssignAisleCamera"
          component={AssignAisleCamera}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ConfirmAisleQr"
          component={ConfirmAisleQr}
          // component={(props)=>{
          //   <Suspense fallback={<ActivityIndicator />}>
          // <ConfirmAisleQr {...props} />
          //   </Suspense>
          // }}
        />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
    <AlertNotificationRoot>
      <AuthGuard>
        <Tab.Navigator
          initialRouteName="Home"
          // screenOptions={{    tabBarHideOnKeyboard: true }}
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
              tabBarStyle: {  },
              
              tabBarIcon: ({  }) => (
                <Feather name="home" size={25} color={'#005D7F'} />
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
                <Feather name="qrcode" size={25} color={'#005D7F'} />
              ),
            }}
            
            component={AssignComp}
          />
          <Tab.Screen
            name="Transfer"
            options={{
              headerShown: false,
              tabBarLabel: 'Transfer',
              tabBarIcon: ({ color, size }) => (
                <Feather name="retweet" size={25} color={'#005D7F'} />
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
                <Feather name="history" size={25} color={'#005D7F'} />
              ),
            }}
            component={History}
          />
       
        </Tab.Navigator>
      </AuthGuard>
      </AlertNotificationRoot>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})