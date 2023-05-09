import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/core';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { white } from '../../../../assests/Styles/GlobalTheme'
import LoadIcon from '../../common/LoadIcons';
import { useDispatch } from 'react-redux';
import { ResetAudioEbookFormInput } from '../../../redux/reducers/audioEbookReducer';

const AddAudioChapterComponent = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

  const handleBtnPress = () => {
    dispatch(ResetAudioEbookFormInput());
    navigation.navigate('AddAudioChaptersForm' as never);
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleBtnPress} style={styles.btnContainer}>
          <LoadIcon iconFamily='FontAwesome5' iconName='plus' color='rgba(0,0,0,0.2)' style={{}} size={responsiveFontSize(10)} />
        </TouchableOpacity>
    </View>
  )
}

export default AddAudioChapterComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: responsiveScreenHeight(10),
        alignItems: 'center'
    },
    btnContainer: {
        width: responsiveScreenWidth(50),
        height: responsiveScreenWidth(50),
        borderRadius: responsiveScreenWidth(25),
        backgroundColor: white,
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    }
})