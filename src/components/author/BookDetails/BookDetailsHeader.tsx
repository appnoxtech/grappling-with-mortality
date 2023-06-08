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
import {
  colorPrimary,
  colorSecondary,
  white,
} from '../../../../assests/Styles/GlobalTheme';
import {useDispatch, useSelector} from 'react-redux';
import {EditNewBook} from '../../../redux/reducers/authorReducer';
import {store} from '../../../interfaces/reducer/state';

const BookDetailsHeaderComponent = () => {
  const {showEditorOptions} = useSelector((state: store) => state.common);
  const {selectedBook} = useSelector((state: store) => state.author);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleBackEvent = () => {
    navigation.goBack();
  };

  const handleBookEdit = () => {
    dispatch(EditNewBook());
    navigation.navigate('AddNewBook' as never);
  };

  const handleBookSettingPress = () => {
    navigation.navigate('BookSetting' as never);
  };

  return (
    <View
      style={
        Platform.OS === 'android' ? styles.androidContainer : styles.container
      }>
      <StatusBar
        animated={true}
        backgroundColor={colorPrimary}
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      <TouchableOpacity onPress={handleBackEvent} style={styles.iconContainer}>
        <LoadIcon
          iconName="arrow-back"
          iconFamily="Ionicons"
          style={{}}
          color={white}
          size={30}
        />
      </TouchableOpacity>
      {showEditorOptions ? (
        <TouchableOpacity
          style={styles.bookSetting}
          onPress={handleBookSettingPress}>
          <LoadIcon
            iconName="gear"
            iconFamily="FontAwesome"
            style={{}}
            color={white}
            size={30}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default BookDetailsHeaderComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: responsiveScreenWidth(6),
    borderBottomRightRadius: responsiveScreenWidth(6),
    height: responsiveScreenHeight(12),
    justifyContent: 'center',
    backgroundColor: colorPrimary,
  },
  androidContainer: {
    borderBottomLeftRadius: responsiveScreenWidth(6),
    borderBottomRightRadius: responsiveScreenWidth(6),
    height: responsiveScreenHeight(10),
    backgroundColor: colorPrimary,
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
    alignItems: 'center',
  },
  image: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
    borderRadius: responsiveScreenWidth(7),
    resizeMode: 'cover',
  },
  iconContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? responsiveScreenHeight(2.7) : responsiveScreenHeight(2),
    left: responsiveScreenWidth(3) 
  },
  rightContainer: {
    width: responsiveScreenWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionContainer: {},
  bookSetting: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? responsiveScreenHeight(2.7) : responsiveScreenHeight(2),
    right: responsiveScreenWidth(3) 
  },
});
