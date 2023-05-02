import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Profile</Text>
       </View>
    </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: responsiveScreenWidth(6),
        borderBottomRightRadius: responsiveScreenWidth(6),
        height: responsiveScreenHeight(13),
        paddingBottom: responsiveScreenHeight(2),
        justifyContent: 'flex-end',
        backgroundColor:'#f1f9ec'
    },
    headerContainer: {
        paddingHorizontal: responsiveFontSize(3),
    },
    headerText: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: '600',
        letterSpacing: 0.3
    }
})