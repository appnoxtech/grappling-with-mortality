import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderWithBackBtn from './HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {white} from '../../../../assests/Styles/GlobalTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LoadIcon from '../LoadIcons';

interface props {
  type: 'CUSTOMER' | 'AUTHOR',
  title: string;
}

const HeaderWithSearch: React.FC<props> = ({type, title}) => {
  const Navigation = useNavigation();
  const handleSearchIconClick = () => {
    Navigation.navigate('Search' as never, {type} as never);
  };
  return (
    <HeaderWithBackBtn>
      <React.Fragment>
        <View style={styles.pageNameContainer}>
          <Text style={styles.pageName}>{title}</Text>
        </View>
        <View
          style={
            Platform.OS === 'android'
              ? styles.androidBtnContainer
              : styles.btnContainer
          }>
          <TouchableOpacity onPress={handleSearchIconClick}>
            <LoadIcon
              iconName="search"
              iconFamily="Ionicons"
              style={{}}
              color={white}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    </HeaderWithBackBtn>
  );
};

export default HeaderWithSearch;

const styles = StyleSheet.create({
  pageNameContainer: {
    position: 'absolute',
    bottom:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(2.2)
        : responsiveScreenHeight(2.8),
    left: responsiveScreenWidth(13),
    alignItems: 'center',
  },
  pageName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: white,
  },
  btnContainer: {
    position: 'absolute',
    width: responsiveScreenWidth(10),
    bottom: responsiveScreenHeight(1.7),
    right: responsiveScreenWidth(4),
  },
  androidBtnContainer: {
    position: 'absolute',
    width: responsiveScreenWidth(10),
    bottom: responsiveScreenHeight(2.8),
    right: responsiveScreenWidth(3),
  },
});
