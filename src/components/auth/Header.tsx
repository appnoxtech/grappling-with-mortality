import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colorPrimary, white} from '../../../assests/Styles/GlobalTheme';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {LandingPageBtnLabels} from '../../utils/constants/authConstant';
import {LoginHeaderProps} from '../../interfaces/auth/headerInterface';
import CommonHeader from '../common/headers/CommonHeader';

const LandingPageHeader: React.FC<LoginHeaderProps> = ({
  activeLabel,
  handleLabelClick,
}) => {
  return (
    <CommonHeader>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => handleLabelClick(LandingPageBtnLabels.Login)}>
          <Text style={styles.btnLabel}>{LandingPageBtnLabels.Login}</Text>
          {activeLabel === LandingPageBtnLabels.Login ? (
            <View style={styles.loginUnderLine} />
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => handleLabelClick(LandingPageBtnLabels.Register)}>
          <Text style={styles.btnLabel}>{LandingPageBtnLabels.Register}</Text>
          {activeLabel === LandingPageBtnLabels.Register ? (
            <View style={styles.registerUnderLine} />
          ) : null}
        </TouchableOpacity>
      </View>
    </CommonHeader>
  );
};

export default LandingPageHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPrimary,
    paddingTop: responsiveScreenHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: responsiveScreenWidth(5.5),
    borderBottomRightRadius: responsiveScreenWidth(5.5),
  },
  btnContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(1),
  },
  btnLabel: {
    fontSize: responsiveFontSize(2.3),
    textTransform: 'uppercase',
    fontWeight: '600',
    color: white,
  },
  btnLabelActive: {
    fontSize: responsiveFontSize(2.5),
    textTransform: 'uppercase',
    color: white,
    textDecorationLine: 'underline',
  },
  registerUnderLine: {
    height: 0, // height is '0' so that the view will not occupy space
    width: 90, // as much as you want to 'Stretch' the underline
    borderTopColor: white,
    borderTopWidth: 2, // 'Thickness' of the underline
    marginTop: responsiveScreenHeight(0.4),
  },
  loginUnderLine: {
    height: 0, // height is '0' so that the view will not occupy space
    width: 60, // as much as you want to 'Stretch' the underline
    borderTopColor: white,
    borderTopWidth: 2, // 'Thickness' of the underline
    marginTop: responsiveScreenHeight(0.3), // 'Gap' between the content & the underline
  },
});
