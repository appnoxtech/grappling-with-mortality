import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderWithBackBtn from './HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {white} from '../../../../assests/Styles/GlobalTheme';

interface props {
  title: string;
}

const HeaderWithTitle: React.FC<props> = ({title}) => {
  console.log('title', title);
  return (
    <HeaderWithBackBtn>
      <View style={styles.pageNameContainer}>
        <Text style={styles.pageName}>{title}</Text>
      </View>
    </HeaderWithBackBtn>
  );
};

export default HeaderWithTitle;

const styles = StyleSheet.create({
  pageNameContainer: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(8.5)
        : responsiveScreenHeight(2.7),
    left: responsiveScreenWidth(15),
    alignItems: 'center',
  },
  pageName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: white,
  },
});
