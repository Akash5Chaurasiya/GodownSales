import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageIndex } from '../../assets/AssestsIndex'

const Navbar = () => {
    return (
        <View className='bg-red-600'>
            {/* <Image source={ImageIndex.logo} className='' /> */}
            <Text className='bg-pink-600'>Hii Photo kaha h?</Text>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({})