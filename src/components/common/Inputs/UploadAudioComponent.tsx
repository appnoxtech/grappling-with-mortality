import {Alert, StyleSheet, Text, Touchable, View} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';
import LoadIcon from '../LoadIcons';
import {ColorGrey, colorSecondary} from '../../../../assests/Styles/GlobalTheme';
import { ImageUploadService } from '../../../services/common/ImageUploadService';

interface props {
    value: string,
    setValue(link: string): void,
    error: string
};

const UploadAudioComponent: React.FC<props> = ({value, setValue, error}) => {
  const handleBtnPress = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: types.audio,
      });
      handelBookPdfUpload(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  const handelBookPdfUpload = async (pickerResult: any) => {
    try {
      let bookForm = new FormData();
      bookForm.append('file', pickerResult);
      const res = await ImageUploadService(bookForm);
      console.log('res', res.data);
      const {data} = res.data;
      console.log('data', data);
      const docsUrl = data.baseUrl + data.imagePath;
      setValue(docsUrl);
    } catch (error: any) {
      Alert.alert('Error', error.response.data.msg);
    }
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  return (
    <TouchableOpacity
      onPress={handleBtnPress}
      style={[
        styles.audioContainer,
        {borderColor: error ? 'red' : value ? colorSecondary : ColorGrey},
      ]}>
      <LoadIcon
        iconFamily="MaterialCommunityIcons"
        iconName="music-circle"
        size={responsiveFontSize(10)}
        color={value ? colorSecondary : ColorGrey}
        style={{}}
      />
    </TouchableOpacity>
  );
};

export default UploadAudioComponent;

const styles = StyleSheet.create({
  audioContainer: {
    width: responsiveScreenHeight(20),
    height: responsiveScreenHeight(20),
    borderRadius: responsiveScreenHeight(10),
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(3),
  },
});
