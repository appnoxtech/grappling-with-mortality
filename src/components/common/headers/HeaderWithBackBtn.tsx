import React, {ReactNode} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
}

const HeaderWithBackBtn: React.FC<props> = ({children}) => {
  const navigation = useNavigation();

  const handleBackBtnPress = () => {
    console.log('Clicled');
    navigation.goBack();
  };

  return (
    <CommonHeader paddingTop={10}>
      <StatusBar
        animated={true}
        backgroundColor={colorPrimary}
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      <TouchableOpacity
        onPress={handleBackBtnPress}
        style={styles.btnContainer}>
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
    top: responsiveScreenHeight(3),
    left: responsiveScreenWidth(4),
  },
});
