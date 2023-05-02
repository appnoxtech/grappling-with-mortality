import {StyleSheet, Text, View} from 'react-native';
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

const inputsConstant = {
  chapterName: {
    placeholder: 'Chapter Name',
    id: 'chapterName',
  },
};

const initialState = {
  chapterName: '',
  audioLink: '',
};

const errorInitialState = {
  chapterName: '',
  audioLink: '',
};

const AddAudioChaptersForm = () => {
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(errorInitialState);
  const AddAudioChapterServiceHandler = useAddAudioChapterHook();

  const HandleInputsTextChange = (text: string, id: string) => {
    setInputs({
      ...inputs,
      [id]: text,
    });
  };

  const setAudioLink = (link: string) => {
    setInputs({...inputs, audioLink: link})
  }

  const handleAddChapter = () => {
    console.log('inputs', inputs);
    AddAudioChapterServiceHandler(inputs);
  };

  return (
    <View style={styles.container}>
      <HeaderWithBackBtn />
      <View style={styles.formBody}>
        <UploadAudioComponent value={inputs.audioLink} setValue={setAudioLink} />
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
            label="Add Chapter"
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
