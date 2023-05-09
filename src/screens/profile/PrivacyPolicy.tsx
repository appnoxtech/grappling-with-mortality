import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {white} from '../../../assests/Styles/GlobalTheme';
import {PrivacyPolicyText} from '../../utils/constants/privacyPolicy';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <HeaderWithBackBtn>
        <View style={styles.pageNameContainer}>
          <Text style={styles.pageName}>Privacy Policy</Text>
        </View>
      </HeaderWithBackBtn>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.privacyText}>{PrivacyPolicyText}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageNameContainer: {
    position: 'absolute',
    top: responsiveScreenHeight(6.5),
    left: responsiveScreenWidth(15),
    alignItems: 'center',
  },
  pageName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: white,
  },
  body: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3)
  },
  contentContainer: {
    paddingBottom: responsiveScreenHeight(4)
  },
  privacyText: { 
    fontSize: responsiveFontSize(1.7),
    letterSpacing: 0.4,
    lineHeight: responsiveFontSize(2),
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'justify'
  }
});
