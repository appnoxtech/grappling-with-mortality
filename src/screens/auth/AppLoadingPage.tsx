import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Animated, ImageBackground, StyleSheet, Text} from 'react-native';
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { white } from '../../../assests/Styles/GlobalTheme';

const path = '../../../assests/images/bg.jpg';
const appName = 'Nobleman Books';

const AppLoadingPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
     setTimeout(() => {
       navigation.navigate('LandingPage' as never);
     }, 2000);
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      source={require(path)}
      style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}>
        <Text style={styles.fadingText}>{appName}</Text>
      </Animated.View>
    </ImageBackground>
  );
};

export default AppLoadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(10)
  },
  fadingContainer: {
    backgroundColor: 'transparent',
  },
  fadingText: {
    fontSize: responsiveFontSize(9),
    color: white,
    textAlign: 'center',
    fontWeight: '600'
  },
});
