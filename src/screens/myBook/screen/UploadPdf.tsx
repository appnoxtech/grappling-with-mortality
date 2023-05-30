import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/core';
import {white} from '../../../../assests/Styles/GlobalTheme';
import HeaderWithBackBtn from '../../../components/common/headers/HeaderWithBackBtn';
import {initialState} from '../../../utils/constants/authors/addNewBook';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
import useKeyboardVisibleListener from '../../../hooks/CommonHooks/isKeyboardVisibleHook';
import DocumentPicker from '../../../interfaces/components/inputs/DocumentPicker';
import {AddNewBookService, UpdateBookService} from '../../../services/author/BooksServices';
import useGetBookList from '../../../hooks/AuthorHooks/GetBookListHooks';
import {ClearNewBookDetails} from '../../../redux/reducers/authorReducer';

const placeHolder = {
  description: 'Description',
  authorName: 'Author Name',
  btn: 'Continue',
};

const AddBookDocs = () => {
  const dispatch = useDispatch();
  const {newBook} = useSelector((state: any) => state.author);
  const GetAuthorBookListServiceHandler = useGetBookList();
  const [errors, setErrors] = useState(initialState);
  const navigation = useNavigation();
  const isKeyboardVisible = useKeyboardVisibleListener();

  const handelBtnPress = () => {
    if (newBook.bookLink) {
      if (newBook._id) {
        EditNewBookServiceHandler();
      } else {
        UploadNewBookServiceHandler();
      }
    } else {
      Alert.alert('Error', 'You forgot to upload the book!');
    }
  };

  const UploadNewBookServiceHandler = async () => {
    try {
      await AddNewBookService(newBook);
      await GetAuthorBookListServiceHandler();
      dispatch(ClearNewBookDetails());
      Alert.alert('Congratulations!', 'Your Book Uploaded Successfully!');
      setTimeout(() => {
        navigation.navigate('Homepage' as never);
      }, 1000);
    } catch (error: any) {
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };

  const EditNewBookServiceHandler = async () => {
    try {
      const {
        bookName,
        bookImage,
        description,
        authorName,
        authorImage,
        noOfPages,
        bookLink,
      } = newBook;

      await UpdateBookService({
        bookId: newBook._id,
        bookName,
        bookImage,
        description,
        authorName,
        authorImage,
        noOfPages,
        bookLink,
      });

      await GetAuthorBookListServiceHandler();
      dispatch(ClearNewBookDetails());
      Alert.alert('Congratulations!', 'Your Book Updated Successfully!');
      setTimeout(() => {
        navigation.navigate('Homepage' as never);
      }, 1000);
    } catch (error: any) {
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HeaderWithBackBtn paddingTop={Platform.OS === 'android' ? 8 : 13} />
        <DocumentPicker />
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

export default AddBookDocs;

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
