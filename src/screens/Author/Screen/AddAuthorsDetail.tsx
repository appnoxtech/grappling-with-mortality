import {
  Keyboard,
  Platform,
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
import {useNavigation} from '@react-navigation/core';
import HeaderWithBackBtn from '../../../components/common/headers/HeaderWithBackBtn';
import InputComponent from '../../../components/common/Inputs/InputComponent';
import {initialState} from '../../../utils/constants/authors/addNewBook';
import {ImagePickerComponent} from '../../../components/common/Inputs/ImagePickerComponent';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
import useKeyboardVisibleListener from '../../../hooks/CommonHooks/isKeyboardVisibleHook';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {white} from '../../../../assests/Styles/GlobalTheme';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateNewBookDetails} from '../../../redux/reducers/authorReducer';
import {NewBookUpdateKey} from '../../../interfaces/author/book.interface';

const placeHolder = {
  description: 'Description',
  authorName: 'Author Name',
  btn: 'Continue',
};

const inputsId = {
  bookName: 'bookName',
  descr: 'description',
  authorName: 'authorName',
  bookImage: 'bookImage',
};

const imagePickerInputContant = {
  coverPhoto: 'Upload Author Image',
  iconFamily: 'Ionicons',
  iconName: 'person-add-sharp',
  iconStyle: {marginBottom: responsiveScreenHeight(2)},
  color: 'rgba(128,128,128,0.4)',
  iconSize: responsiveScreenHeight(10),
};

const AddAuthorDetails = () => {
  const dispatch = useDispatch();
  const {newBook} = useSelector((state: any) => state.author);
  const [errors, setErrors] = useState(initialState);
  const navigation = useNavigation();

  const isKeyboardVisible = useKeyboardVisibleListener();
  const onChangeHandler = (text: string, id: NewBookUpdateKey) => {
    dispatch(UpdateNewBookDetails({key: id, value: text}));
  };

  const handelBtnPress = () => {
    const isValid = validation();
    if(isValid) {
      navigation.navigate('AddBookDocs' as never);
    }
  };

  const validation = () => {
    if (!newBook.authorImage) {
      setErrors({
        ...initialState,
        authorImage: 'Required !',
      });
      return false;
    } else if (!newBook.authorName) {
      setErrors({
        ...initialState,
        authorName: 'Required !',
      });
      return false;
    } else {
      setErrors(initialState);
      return true;
    }
  };

  console.log('newBook', newBook);
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HeaderWithBackBtn paddingTop={Platform.OS === 'android' ? 8 : 13} />
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
              value={newBook.authorImage}
              error={errors.authorImage}
              id={'authorImage'}
              setValue={onChangeHandler}
            />
            <InputComponent
              placeholder={placeHolder.authorName}
              value={newBook.authorName}
              error={errors.authorName}
              containerStyle={styles.inputContainer}
              id={inputsId.authorName}
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

export default AddAuthorDetails;

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
