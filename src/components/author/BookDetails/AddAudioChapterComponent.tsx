import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import {white} from '../../../../assests/Styles/GlobalTheme';
import LoadIcon from '../../common/LoadIcons';
import {ResetAudioEbookFormInput} from '../../../redux/reducers/audioEbookReducer';
import {store} from '../../../interfaces/reducer/state';

const AddAudioChapterComponent = () => {
  const {showEditorOptions} = useSelector((state: store) => state.common);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const path = '../../../../assests/animations/comming-soon.json';
  
  const handleBtnPress = () => {
    dispatch(ResetAudioEbookFormInput());
    navigation.navigate('AddAudioChaptersForm' as never);
  };

  return (
    <View style={styles.container}>
      {showEditorOptions ? (
        <TouchableOpacity onPress={handleBtnPress} style={styles.btnContainer}>
          <LoadIcon
            iconFamily="FontAwesome5"
            iconName="plus"
            color="rgba(0,0,0,0.2)"
            style={{}}
            size={responsiveFontSize(10)}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.animationContainer}>
          <Lottie
            resizeMode="cover"
            style={styles.animationStyle}
            source={require(path)}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
};

export default AddAudioChapterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: responsiveScreenHeight(10),
    alignItems: 'center',
  },
  btnContainer: {
    width: responsiveScreenWidth(40),
    height: responsiveScreenWidth(40),
    borderRadius: responsiveScreenWidth(20),
    backgroundColor: white,
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: responsiveScreenWidth(50),
    height: responsiveScreenWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationStyle: {},
});
