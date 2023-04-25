import React, { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import CommonHeader from './CommonHeader'
import LoadIcon from '../LoadIcons'
import { white } from '../../../../assests/Styles/GlobalTheme'

interface props {
    children?: ReactNode
}

const HeaderWithBackBtn:React.FC<props> = ({children}) => {
  const navigation = useNavigation();

  const handleBackBtnPress = () => {
    navigation.goBack();
  }
  return (
    <CommonHeader>
        <TouchableOpacity onPress={handleBackBtnPress} style={styles.btnContainer}>
            <LoadIcon iconName='arrow-back' iconFamily='Ionicons' style={{}} color={white} size={30} />
        </TouchableOpacity>
        {children}
    </CommonHeader>
  )
}

export default HeaderWithBackBtn

const styles = StyleSheet.create({
    btnContainer: {
        position: 'absolute',
        top: responsiveScreenHeight(6),
        left: responsiveScreenWidth(4),
    }
})