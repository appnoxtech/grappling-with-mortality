import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { colorPrimary } from '../../../../assests/Styles/GlobalTheme'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

interface props {
    children: ReactNode,
    paddingTop?:number
}

const CommonHeader:React.FC<props> = ({children, paddingTop = 15}) => {
  return (
    <View style={[styles.container, {paddingTop: responsiveScreenHeight(paddingTop)}]}>
      {children}
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: colorPrimary,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: responsiveScreenWidth(5.5),
        borderBottomRightRadius: responsiveScreenWidth(5.5),
      }
})