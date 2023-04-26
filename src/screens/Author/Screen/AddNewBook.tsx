import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/core'
import HeaderWithBackBtn from '../../../components/common/headers/HeaderWithBackBtn';
import InputComponent from '../../../components/common/Inputs/InputComponent';
import {initialState} from '../../../utils/constants/authors/addNewBook';
import {ImagePickerComponent} from '../../../components/common/Inputs/ImagePickerComponent';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
import useKeyboardVisibleListener from '../../../hooks/CommonHooks/isKeyboardVisibleHook';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {white} from '../../../../assests/Styles/GlobalTheme';

const placeHolder = {
  BookName: 'Book Name',
  description: 'Description',
  authorName: 'Author Name',
  nmbrofPages: 'Number of Pages',
  btn: 'Continue',
};

const inputsId = {
  bookName: 'bookName',
  descr: 'description',
  authorName: 'authorName',
  bookImage: 'bookImage',
  nmbrofPages: 'noOfPages',
};

const imagePickerInputContant = {
  coverPhoto: 'Add Cover Photo',
  iconFamily: 'MaterialCommunityIcons',
  iconName: 'book',
  iconStyle: {marginBottom: responsiveScreenHeight(2)},
  color: 'rgba(128,128,128,0.4)',
  iconSize: responsiveScreenHeight(10),
};

const AddNewBook = () => {
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const Navigation = useNavigation();
  const isKeyboardVisible = useKeyboardVisibleListener();
  const onChangeHandler = (text: string, id: string) => {
    return {
      ...inputs,
      [id]: text,
    };
  };

  const handelBtnPress = () => {
    Navigation.navigate('AddAuthorDetails' as never)
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HeaderWithBackBtn />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.inputsContainer}>
            <ImagePickerComponent
              label={imagePickerInputContant.coverPhoto}
              iconFamily={imagePickerInputContant.iconFamily}
              iconName={imagePickerInputContant.iconName}
              iconColor={imagePickerInputContant.color}
              iconStyle={imagePickerInputContant.iconStyle}
              iconSize={imagePickerInputContant.iconSize}
              value={inputs.bookImage}
              error={errors.bookImage}
              id={inputsId.bookImage}
              setValue={onChangeHandler}
            />
            <InputComponent
              placeholder={placeHolder.BookName}
              value={inputs.bookName}
              error={errors.bookName}
              containerStyle={styles.inputContainer}
              id={inputsId.bookName}
              onChangeHandler={onChangeHandler}
            />
            <InputComponent
              placeholder={placeHolder.nmbrofPages}
              value={inputs.noOfPages}
              error={errors.noOfPages}
              containerStyle={styles.inputContainer}
              id={inputsId.nmbrofPages}
              onChangeHandler={onChangeHandler}
              keyboardType='numeric'
            />
            <InputComponent
              placeholder={placeHolder.description}
              value={inputs.description}
              error={errors.description}
              containerStyle={styles.inputContainer}
              id={inputsId.descr}
              allowMultiLine={true}
              onChangeHandler={onChangeHandler}
            />
          </View>
        </KeyboardAwareScrollView>
        {!isKeyboardVisible ? (
          <View style={styles.btnContainer}>
            <ButtonPrimary
              label={placeHolder.btn}
              handleBtnPress={handelBtnPress}
            />
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddNewBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  inputsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(3),
  },
  inputContainer: {
    marginVertical: responsiveScreenHeight(1.3),
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: responsiveFontSize(2),
  },
  iconStyle: {},
  btnContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    marginVertical: responsiveScreenHeight(4),
    width: '100%',
  },
});
