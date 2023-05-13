import {Keyboard, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {white} from '../../../../assests/Styles/GlobalTheme';
import InputComponent from '../../../components/common/Inputs/InputComponent';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
import useUpdateChaptersHook from '../../../hooks/AuthorHooks/UpdateChaptersHook';
import HeaderWithBackBtn from '../../../components/common/headers/HeaderWithBackBtn';
import HeaderComponent from '../../../components/Homepages/Discover/HeaderComponent';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../../interfaces/reducer/state';
import {NewChapterKey} from '../../../interfaces/author/chapter.interface';
import {UpdateChapterDetails} from '../../../redux/reducers/chaptersReducer';
import useKeyboardVisibleListener from '../../../hooks/CommonHooks/isKeyboardVisibleHook';

const inputsConstant = {
  chapterNo: {
    placeholder: 'Chapter Number',
    id: 'chapterNo',
  },
  chapterName: {
    placeholder: 'Chapter Name',
    id: 'chapterName',
  },
  startingPageNo: {
    placeholder: 'Start From',
    id: 'startingPageNo',
  },
  endingPageNo: {
    placeholder: 'End At',
    id: 'endingPageNo',
  },
};

const errorInitialState = {
  chapterNo: '',
  chapterName: '',
  startingPageNo: '',
  endingPageNo: '',
};

const AddChaptersForm = () => {
  const inputs = useSelector((state: store) => state.chapter.newChapter);
  const dispatch = useDispatch();
  const isKeyboardOpen = useKeyboardVisibleListener();
  const [errors, setErrors] = useState(errorInitialState);
  const {UpdateChapterServiceHandler, UpdateSingleChapterServiceHandler} = useUpdateChaptersHook();

  const HandleInputsTextChange = (text: string | number, id: NewChapterKey) => {
    if (typeof text === 'number') {
      dispatch(UpdateChapterDetails({key: id, value: isNaN(text) ? 0 : text}));
    } else {
      dispatch(UpdateChapterDetails({key: id, value: text}));
    }
  };
  const handleAddChapter = () => {
    const isValid = validation();
    if (isValid && inputs._id) {
      const {chapterName, chapterNo, startingPageNo, endingPageNo} = inputs;
      UpdateSingleChapterServiceHandler({chapterName, chapterNo, startingPageNo, endingPageNo}, inputs._id);
    } else if(isValid) {
      UpdateChapterServiceHandler(inputs);
    }
  };

  const validation = () => {   
   if (typeof(inputs.chapterNo) === 'string') {
      setErrors({
        ...errorInitialState,
        chapterNo: 'Required !',
      });
      return false;
    } else if (inputs.chapterName === '') {
      setErrors({
        ...errorInitialState,
        chapterName: 'Required !',
      });
      return false;
    } else if (typeof(inputs.startingPageNo) === 'string') {
      setErrors({
        ...errorInitialState,
        startingPageNo: 'Required !',
      });
      return false;
    } else if (isNaN(inputs.endingPageNo)) {
      setErrors({
        ...errorInitialState,
        endingPageNo: 'Required !',
      });
      return false;
    } else if (inputs.startingPageNo > inputs.endingPageNo) {
      setErrors({
        ...errorInitialState,
        endingPageNo: 'Enter a valid Page Number',
      });
      return false;
    } else {
      setErrors({
        ...errorInitialState,
      });
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithBackBtn paddingTop={Platform.OS === 'android' ? 8 : 13} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainBody}>
        <View style={styles.inputsContainer}>
          <InputComponent
            placeholder={inputsConstant.chapterNo.placeholder}
            value={inputs.chapterNo}
            error={errors.chapterNo}
            containerStyle={styles.inputContainer}
            id={inputsConstant.chapterNo.id}
            onChangeHandler={HandleInputsTextChange}
            keyboardType="numeric"
          />
          <InputComponent
            placeholder={inputsConstant.chapterName.placeholder}
            value={inputs.chapterName}
            error={errors.chapterName}
            containerStyle={styles.inputContainer}
            id={inputsConstant.chapterName.id}
            onChangeHandler={HandleInputsTextChange}
          />
          <InputComponent
            placeholder={inputsConstant.startingPageNo.placeholder}
            value={inputs.startingPageNo}
            error={errors.startingPageNo}
            containerStyle={styles.inputContainer}
            id={inputsConstant.startingPageNo.id}
            onChangeHandler={HandleInputsTextChange}
            keyboardType="numeric"
          />
          <InputComponent
            placeholder={inputsConstant.endingPageNo.placeholder}
            value={inputs.endingPageNo}
            error={errors.endingPageNo}
            containerStyle={styles.inputContainer}
            id={inputsConstant.endingPageNo.id}
            onChangeHandler={HandleInputsTextChange}
            keyboardType="numeric"
          />
        </View>
        {
          !isKeyboardOpen ? <View style={styles.center}>
          <View style={styles.btnContainer}>
            <ButtonPrimary
              label={inputs._id ? "Update Chapter"  : "Add Chapter" }
              handleBtnPress={handleAddChapter}
            />
          </View>
        </View> : null
        }

      </View>
      </TouchableWithoutFeedback>
      
    </View>
  );
};

export default AddChaptersForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  inputContainer: {
    marginVertical: responsiveScreenHeight(1.3),
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: responsiveFontSize(2),
  },
  btnContainer: {
    marginVertical: responsiveScreenHeight(4),
    width: responsiveScreenWidth(90),
  },
  mainBody: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3),
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: responsiveScreenHeight(2),
  },
  center: {
    alignItems: 'center',
  },
});
