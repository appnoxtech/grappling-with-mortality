import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorGrey, colorPrimary, colorSecondary, white} from '../../../../assests/Styles/GlobalTheme';

interface props {
  label: string;
  type: string;
}

const SocialLoginBtn: React.FC<props> = ({label, type}) => {
  const handlePress = () => {
    if (type === 'facebook') {
      console.log('pressed');
      //loginFacebook();
    } else {
      //   googleSignIn();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.btnContainer}>
          <View style={styles.btnImageContainer}>
            {type === 'google' ? (
              <Image
                source={require('../../../../assests/images/google.png')}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <FontAwesome
                name="facebook-official"
                style={styles.icon}
                color={'#1877f2'}
              />
            )}
          </View>
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>{label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginBtn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: responsiveScreenHeight(1),
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: '100%', width: '100%'},
  btnContainer: {
    width: '100%',
    borderRadius: responsiveScreenWidth(2),
    backgroundColor: white,
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(128,128,128,0.5)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnImageContainer: {
    width: responsiveScreenWidth(8),
    height: responsiveScreenHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingStart: responsiveScreenWidth(3),
  },
  btnText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
  },
  icon: {
    fontSize: responsiveFontSize(3),
  },
});
