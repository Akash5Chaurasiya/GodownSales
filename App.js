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
import PurchaseVSlip from './src/screens/Purchase/PurchaseVSlip/PurchaseVSlip.tsx'
import PurchaseVerficationScan from './src/screens/Purchase/PurchaseVerficationScan/PurchaseVerficationScan.tsx'
import PurchaseVImageLog from './src/screens/Purchase/PurchaseVImageLog/PurchaseVImageLog.tsx'
import Sales from './src/screens/Sales/Sales.tsx'
import SalesItemDes from './src/screens/Sales/SalesItemDes/SalesItemDes.tsx'
import SalesScanQr from './src/screens/Sales/SalesScanQr/SalesScanQr.tsx'
import SalesAisleQr from './src/screens/Sales/SalesAisleQr/SalesAisleQr.tsx'
import SalesAisleDes from './src/screens/Sales/SalesAisleDes/SalesAisleDes.tsx'
import SalesAislePhoto from './src/screens/Sales/SalesAislePhoto/SalesAislePhoto.tsx'
import SalesVImageLog from './src/screens/Sales/SalesVImageLog/SalesVImageLog.tsx'

import Reconciliation from './src/screens/Reconciliation/Reconciliation.tsx'
import ReconScanQr from './src/screens/Reconciliation/ReconScanQr/ReconScanQr.tsx'
import SalesVerification from './src/screens/Sales/SalesVerification/SalesVerification.tsx'
import SalesVSlip from './src/screens/Sales/SalesVSlip/SalesVSlip.tsx'
import SalesVerificationScan from './src/screens/Sales/SalesVerificationScan/SalesVerificationScan.tsx'
import PurchaseVerification from './src/screens/Purchase/PurchaseVerification/PurchaseVerification.tsx'
import ReconAisleDes from './src/screens/Reconciliation/ReconAisleDes/ReconAisleDes.tsx'

import ReconAislePhoto from './src/screens/Reconciliation/ReconAislePhoto/ReconAislePhoto.tsx'
import Transfer from './src/screens/Transfer/Transfer.tsx'
import STransfer from './src/screens/Transfer/SourceTransfer/STranfer.tsx'
import DTransfer from './src/screens/Transfer/DestTransfer/DTranfer.tsx'
import TransferScanQr from './src/screens/Transfer/SourceTransfer/TransferScanQr.tsx'
import SourceGodownDes from './src/screens/Transfer/SourceTransfer/SourceGodownDes.tsx'
import STransferAisleScan from './src/screens/Transfer/SourceTransfer/STransferAisleScan.tsx'
import SAisleDes from './src/screens/Transfer/SourceTransfer/SAisleDes.tsx'
import SAislePhoto from './src/screens/Transfer/SourceTransfer/SAislePhoto.tsx'
import SAisleVerification from './src/screens/Transfer/SourceTransfer/SAisleVerification.tsx'

import SCheckAisleQ from  './src/screens/Transfer/SourceTransfer/SCheckAisleQ.tsx'
import DTransferScanQr from './src/screens/Transfer/DestTransfer/DTranferScanQr.tsx'
import DSourceGodownDes  from './src/screens/Transfer/DestTransfer/DSourceGodownDes.tsx'
import  DTransferAisleScan  from './src/screens/Transfer/DestTransfer/DTranferAisleScan.tsx'
import DAisleDes  from './src/screens/Transfer/DestTransfer/DAisleDes.tsx'
import DAislePhoto  from './src/screens/Transfer/DestTransfer/DAislePhoto.tsx'
import DAisleVerification  from './src/screens/Transfer/DestTransfer/DAisleVerification.tsx'
import DCheckAisleQ  from './src/screens/Transfer/DestTransfer/DCheckAisleQ.tsx'

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
          name="PurchaseVSlip"
          component={PurchaseVSlip}
        />
          <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PurchaseVerficationScan"
          component={PurchaseVerficationScan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PurchaseVImageLog"
          component={PurchaseVImageLog}
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
          name="SalesVSlip"
          component={SalesVSlip}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesVerificationScan"
          component={SalesVerificationScan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SalesVImageLog"
          component={SalesVImageLog}
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
          name="ReconAislePhoto"
          component={ReconAislePhoto}
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

  const TransferComp = () =>{
    return (
      <Stack.Navigator>
        <Stack.Screen initialRouteName='Transfer'
          options={{
            headerShown:false
          }}
          name="Transfer"
          component={Transfer}
        />
         <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DTransfer"
          component={DTransfer}
        />
         <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="STransfer"
          component={STransfer}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="TransferScanQr"
          component={TransferScanQr}
        />
         <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="SourceGodownDes"
          component={SourceGodownDes}
        />
         <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="STransferAisleScan"
          component={STransferAisleScan}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="SAisleDes"
          component={SAisleDes}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="SAislePhoto"
          component={SAislePhoto}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="SCheckAisleQ"
          component={SCheckAisleQ}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="SAisleVerification"
          component={SAisleVerification}
        />
        
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DTransferScanQr"
          component={DTransferScanQr}
        />
         <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DSourceGodownDes"
          component={DSourceGodownDes}
        />
         <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DTransferAisleScan"
          component={DTransferAisleScan}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DAisleDes"
          component={DAisleDes}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DAislePhoto"
          component={DAislePhoto}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DCheckAisleQ"
          component={DCheckAisleQ}
        />
        <Stack.Screen 
          options={{
            headerShown:false
          }}
          name="DAisleVerification"
          component={DAisleVerification}
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
            component={TransferComp}
          />
        
       
        </Tab.Navigator>
      </AuthGuard>
      </AlertNotificationRoot>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})

