import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonPrimaryProps } from '../../../interfaces/components/buttons/ButtonPrimaryInterface'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { colorPrimary, colorSecondary, white } from '../../../../assests/Styles/GlobalTheme'

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({label, handleBtnPress, isActive=true}) => {
  return (
    <TouchableOpacity style={isActive ? styles.container : styles.inActiveContainer} onPress={handleBtnPress}>
        <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  )
}

export default ButtonPrimary

const styles = StyleSheet.create({
    container: {
       width: '100%',
       backgroundColor: colorPrimary,
       paddingHorizontal: responsiveScreenWidth(3),
       paddingVertical: responsiveScreenHeight(2),
       borderRadius: responsiveScreenWidth(2)
    },
    inActiveContainer: {
      width: '100%',
      backgroundColor: colorSecondary,
      paddingHorizontal: responsiveScreenWidth(3),
      paddingVertical: responsiveScreenHeight(2),
      borderRadius: responsiveScreenWidth(2)
    },
    btnText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '600',
        color: white,
        textAlign: 'center'
    }
})