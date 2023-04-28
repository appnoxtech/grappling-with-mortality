import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import LoadIcon from '../common/LoadIcons';
import {colorSecondary, white} from '../../../assests/Styles/GlobalTheme';
const path = '../../../../assests/images/profile.jpg';

const BookDetailsHeaderComponent = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#f1f9ec'}
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      <View style={styles.body}>
        <TouchableOpacity style={styles.iconContainer}>
          <LoadIcon
            iconName="arrow-back"
            iconFamily="Ionicons"
            style={{}}
            color={colorSecondary}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <LoadIcon
            iconName="bookmark"
            iconFamily="Feather"
            style={{}}
            color={colorSecondary}
            size={30}
          />
          <LoadIcon
            iconName="share-social-sharp"
            iconFamily="Ionicons"
            style={{}}
            color={colorSecondary}
            size={30}
          />
        </View>
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
  iconContainer: {},
  rightContainer: {
    width: responsiveScreenWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
