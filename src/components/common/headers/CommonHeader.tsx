import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { colorPrimary } from '../../../../assests/Styles/GlobalTheme'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

interface props {
    children: ReactNode,
}

const CommonHeader:React.FC<props> = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: colorPrimary,
        paddingTop: responsiveScreenHeight(15),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: responsiveScreenWidth(5.5),
        borderBottomRightRadius: responsiveScreenWidth(5.5),
      }
})