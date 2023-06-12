import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { store } from '../../../interfaces/reducer/state';
import { colorPrimary, colorSecondary, white } from '../../../../assests/Styles/GlobalTheme';
const path = '../../../../assests/images/profile.jpg';

const HeaderComponent = () => {
  const {userDetails} = useSelector((state: store) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colorSecondary}
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      <View style={styles.body}>
        <Text style={styles.userName}>{`Hello, ${userDetails.fullName}`}</Text>
        {
          userDetails?.image ? <Image style={styles.image} source={{uri: userDetails.image}} alt="Profile" /> : <Image style={styles.image} source={require(path)} alt="Profile" />
        }
      </View>
    </SafeAreaView>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: responsiveScreenWidth(6),
    borderBottomRightRadius: responsiveScreenWidth(6),
    height: Platform.OS === 'android' ? responsiveScreenHeight(10) : responsiveScreenHeight(15),
    backgroundColor: colorPrimary,
  },
  userName: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    color: white,
  },
  body: {
    paddingHorizontal: responsiveScreenWidth(5),
    paddingTop: responsiveScreenHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
    borderRadius: responsiveScreenWidth(7),
    resizeMode: 'cover',
  },
});
