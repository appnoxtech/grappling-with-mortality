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
  import {white} from '../../../../assests/Styles/GlobalTheme';
  import {
    responsiveFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
  } from 'react-native-responsive-dimensions';
  import HeaderWithBackBtn from '../../../components/common/headers/HeaderWithBackBtn';
  import InputComponent from '../../../components/common/Inputs/InputComponent';
  import {initialState} from '../../../utils/constants/authors/addNewBook';
  import {ImagePickerComponent} from '../../../components/common/Inputs/ImagePickerComponent';
  import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
  import useKeyboardVisibleListener from '../../../hooks/CommonHooks/isKeyboardVisibleHook';
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from '../../../interfaces/components/inputs/DocumentPicker';
  
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
  
  const AddBookDocs = () => {
    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const isKeyboardVisible = useKeyboardVisibleListener();
    const onChangeHandler = (text: string, id: string) => {
      return {
        ...inputs,
        [id]: text,
      };
    };
  
    const handelBtnPress = () => {};
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <HeaderWithBackBtn />
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
  