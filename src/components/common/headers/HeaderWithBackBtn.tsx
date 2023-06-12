import React, {ReactNode} from 'react';
import {Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import CommonHeader from './CommonHeader';
import LoadIcon from '../LoadIcons';
import {colorPrimary, white} from '../../../../assests/Styles/GlobalTheme';

interface props {
  children?: ReactNode;
  paddingTop?: number,
  showSearch?: boolean
}

const HeaderWithBackBtn: React.FC<props> = ({children, paddingTop = Platform.OS === 'android' ? 10 : 13, showSearch = false}) => {
  const navigation = useNavigation();

  const handleBackBtnPress = () => {
    navigation.goBack();
  };

  return (
    <CommonHeader paddingTop={paddingTop}>
      <StatusBar
        animated={true}
        backgroundColor={colorPrimary}
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      <TouchableOpacity
        onPress={handleBackBtnPress}
        style={ Platform.OS === 'android' ? styles.androidBtnContainer : styles.btnContainer}>
        <LoadIcon
          iconName="arrow-back"
          iconFamily="Ionicons"
          style={{}}
          color={white}
          size={30}
        />
      </TouchableOpacity>
      {children}
    </CommonHeader>
  );
};

export default HeaderWithBackBtn;

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    width: responsiveScreenWidth(10),
    bottom: responsiveScreenHeight(1.7),
    left: responsiveScreenWidth(4),
  },
  androidBtnContainer: {
    position: 'absolute',
    width: responsiveScreenWidth(10),
    bottom: responsiveScreenHeight(2.5),
    left: responsiveScreenWidth(3),
  }
});
