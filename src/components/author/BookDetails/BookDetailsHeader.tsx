import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native';
import LoadIcon from '../../common/LoadIcons';
import {colorSecondary} from '../../../../assests/Styles/GlobalTheme';
import { useDispatch } from 'react-redux';
import { EditNewBook } from '../../../redux/reducers/authorReducer';

const BookDetailsHeaderComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleBackEvent = () => {
    navigation.goBack();
  };

  const handleBookEdit = () => {
    dispatch(EditNewBook());
    navigation.navigate('AddNewBook' as never);
  };

  return (
    <View style={Platform.OS === 'android' ? styles.androidContainer : styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#f1f9ec'}
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      <View style={styles.body}>
        <TouchableOpacity
          onPress={handleBackEvent}
          style={styles.iconContainer}>
          <LoadIcon
            iconName="arrow-back"
            iconFamily="Ionicons"
            style={{}}
            color={colorSecondary}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBookEdit}>
            <LoadIcon
              iconName="book-edit-outline"
              iconFamily="MaterialCommunityIcons"
              style={{}}
              color={colorSecondary}
              size={30}
            />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetailsHeaderComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: responsiveScreenWidth(6),
    borderBottomRightRadius: responsiveScreenWidth(6),
    height: responsiveScreenHeight(15),
    paddingTop: responsiveScreenHeight(3),
    justifyContent: 'center',
    backgroundColor: '#f1f9ec',
  },
  androidContainer: {
    borderBottomLeftRadius: responsiveScreenWidth(6),
    borderBottomRightRadius: responsiveScreenWidth(6),
    height: responsiveScreenHeight(8),
    paddingTop: responsiveScreenHeight(1),
    justifyContent: 'center',
    backgroundColor: '#f1f9ec',
  },
  userName: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    color: 'black',
  },
  body: {
    paddingHorizontal: responsiveScreenWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  image: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
    borderRadius: responsiveScreenWidth(7),
    resizeMode: 'cover',
  },
  iconContainer: {},
  rightContainer: {
    width: responsiveScreenWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
