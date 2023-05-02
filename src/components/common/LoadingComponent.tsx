import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
        <View style={styles.loadingContainer}>
           
        </View>
    </View>
  )
}

export default LoadingComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        width: responsiveScreenWidth(5),
        height: responsiveScreenHeight(7),
        justifyContent: 'center',
        alignItems: 'center'
    }
})