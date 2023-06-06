import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import Lottie from 'lottie-react-native';
import LoadingContext from '../../context/LoadingContext';
import {useSelector} from 'react-redux';
import { white } from '../../../assests/Styles/GlobalTheme';

interface props {
  children: ReactNode;
}

const path = '../../../assests/animations/Loading.json';

const LoadingScreen: React.FC<props> = ({children}) => {
  const {isLoading} = useSelector((state: any) => state.common);

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.isLoadingContainer}>
            <Lottie source={require(path)} autoPlay loop />
          </View>
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  isLoadingContainer: {
    width: responsiveScreenWidth(40),
    height: responsiveScreenWidth(40),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
