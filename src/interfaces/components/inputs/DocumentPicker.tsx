import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadIcon from '../../../components/common/LoadIcons';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
import {colorSecondary, white} from '../../../../assests/Styles/GlobalTheme';
import {ImageUploadService} from '../../../services/common/ImageUploadService';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateNewBookDetails } from '../../../redux/reducers/authorReducer';

const labels = {
  uploadPromp: 'Click here to upload book.',
  success: 'Book uploaded Successfully.'
};
const DocumentPickerComponent = () => {
  const dispatch = useDispatch();
  const {newBook} = useSelector((state: any) => state.author);
  const [pdfLink, setPdfLink] = useState(newBook.bookLink);

  const handleBtnPress = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: types.pdf,
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
      setPdfLink(docsUrl);
      dispatch(UpdateNewBookDetails({key: 'bookLink', value: docsUrl}))
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
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleBtnPress}
          style={[styles.bookPlaceholder, {borderColor: pdfLink ? colorSecondary : 'rgba(128,128,128,0.5)'}]}>
          <LoadIcon
            iconFamily="Entypo"
            iconName="book"
            style={styles.icon}
            size={responsiveFontSize(20)}
            color={pdfLink ? colorSecondary : "rgba(128,128,128,0.5)"}
          />
          <Text style={styles.uploadPrompt}>{pdfLink ? labels.success : labels.uploadPromp}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentPickerComponent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: white,
    marginVertical: responsiveScreenHeight(3),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnContainer: {
    width: responsiveScreenWidth(80),
  },
  bookPlaceholder: {
    width: responsiveScreenWidth(70),
    height: responsiveScreenHeight(40),
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPrompt: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    color: 'rgba(128,128,128,0.5)',
  },
  icon: {
    marginBottom: responsiveScreenHeight(2.5),
  },
});
