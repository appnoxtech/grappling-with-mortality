import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { colorPrimary, white } from '../../../../assests/Styles/GlobalTheme';

interface props {
  title: string
}

const HeaderComponent:React.FC<props> = ({title}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colorPrimary}
        barStyle={'default'}
        showHideTransition={'slide'}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: responsiveScreenWidth(6),
    borderBottomRightRadius: responsiveScreenWidth(6),
    height: Platform.OS === 'ios' ? responsiveScreenHeight(13) : responsiveScreenHeight(10),
    paddingBottom: responsiveScreenHeight(2),
    justifyContent: 'flex-end',
    backgroundColor: colorPrimary,
  },
  headerContainer: {
    paddingHorizontal: responsiveFontSize(3),
  },
  headerText: {
    fontSize: responsiveFontSize(2.7),
    fontWeight: '600',
    letterSpacing: 0.3,
    color: white
  },
});
