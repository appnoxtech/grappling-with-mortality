import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {white} from '../../../../assests/Styles/GlobalTheme';
import UploadAudioComponent from '../../../components/common/Inputs/UploadAudioComponent';
import InputComponent from '../../../components/common/Inputs/InputComponent';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import useUpdateChaptersHook from '../../../hooks/AuthorHooks/UpdateChaptersHook';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
import HeaderWithBackBtn from '../../../components/common/headers/HeaderWithBackBtn';
import useAddAudioChapterHook from '../../../hooks/AuthorHooks/AddAudioChapterHook';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../interfaces/reducer/state';
import { SetAudioEbookFormInputs } from '../../../redux/reducers/audioEbookReducer';
import { AudioEbookKey } from '../../../interfaces/reducer/audioStore.interface';

const inputsConstant = {
  chapterName: {
    placeholder: 'Chapter Name',
    id: 'chapterName',
  },
};

const errorInitialState = {
  chapterName: '',
  audioLink: '',
};

const AddAudioChaptersForm = () => {
  const {inputs} = useSelector((store: store) => store.audio);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(errorInitialState);
  const {AddAudioChapterServiceHandler, UpdateAudioChapterServiceHandler} = useAddAudioChapterHook();

  const HandleInputsTextChange = (text: string, id: AudioEbookKey) => {
    dispatch(SetAudioEbookFormInputs({key: id, value: text}));
  };

  const setAudioLink = (link: string) => {
    dispatch(SetAudioEbookFormInputs({key: 'audioLink', value: link}));
  };

  const handleAddChapter = () => {
    const isValid = validation();
    if (inputs._id && isValid) {
      UpdateAudioChapterServiceHandler(inputs);
    } else if(isValid) {
      AddAudioChapterServiceHandler(inputs);
    }
  };

  const validation = () => {
    if (inputs.audioLink === '') {
      setErrors({
        ...errorInitialState,
        audioLink: 'Required !',
      });
      return false;
    } else if (inputs.chapterName === '') {
      setErrors({
        ...errorInitialState,
        chapterName: 'Required !',
      });
      return false;
    } else {
      setErrors(errorInitialState);
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithBackBtn paddingTop={Platform.OS === 'android' ? 8 : 13} />
      <View style={styles.formBody}>
        <UploadAudioComponent
          error={errors.audioLink}
          value={inputs.audioLink}
          setValue={setAudioLink}
        />
        <InputComponent
          placeholder={inputsConstant.chapterName.placeholder}
          value={inputs.chapterName}
          error={errors.chapterName}
          containerStyle={styles.inputContainer}
          id={inputsConstant.chapterName.id}
          onChangeHandler={HandleInputsTextChange}
        />
      </View>
      <View style={styles.center}>
        <View style={styles.btnContainer}>
          <ButtonPrimary
            label={inputs._id ? "Update Ebook" : "Add Chapter"}
            handleBtnPress={handleAddChapter}
          />
        </View>
      </View>
    </View>
  );
};

export default AddAudioChaptersForm;

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
  formBody: {
    flex: 1,
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(5),
    paddingHorizontal: responsiveScreenWidth(3),
  },
  center: {
    alignItems: 'center',
  },
  btnContainer: {
    marginVertical: responsiveScreenHeight(4),
    width: responsiveScreenWidth(90),
  },
});
