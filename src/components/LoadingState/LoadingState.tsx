import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProgressBar, MD3Colors } from 'react-native-paper'

const LoadingState = () => {
  return (
    <View style={{ flex:1, justifyContent:'center'}}>
      {/* <Text>LoadingState....</Text> */}
      <ProgressBar progress={0.5}  theme={{ colors: { primary: 'green' } }}/>
      
    </View>
  )
}

export default LoadingState

const styles = StyleSheet.create({})