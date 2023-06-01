import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colorPrimary, white} from '../../../assests/Styles/GlobalTheme';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import InputwithIconComponent from '../../components/common/Inputs/InputwithIconComponent';
import {ErrorMessage, inputsConstant} from '../../utils/constants/authConstant';
import ButtonPrimary from '../../components/common/buttons/ButtonPrimary';
import {ChangePasswordService} from '../../services/user/ChangePasswordService';
import {TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useKeyboardVisibleListener from '../../hooks/CommonHooks/isKeyboardVisibleHook';
import {checkPasswordValidity} from '../../utils/helperFunctions/passwordValidation';
import HeaderWithTitle from '../../components/common/headers/HeaderWithTitle';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ResetPassword = () => {
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const isKeyboardVisible = useKeyboardVisibleListener();

  const HandleInputsTextChange = (text: string, id: string) => {
    setInputs({
      ...inputs,
      [id]: text,
    });
    onChangeTextValidation(id, text);
  };

  const onChangeTextValidation = (id: string, value: string) => {
    if (id === 'oldPassword' && value === '') {
      setErrors({
        ...initialState,
        oldPassword: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'oldPassword' && checkPasswordValidity(value)) {
      const msg = checkPasswordValidity(value);
      if (msg) {
        setErrors({
          ...initialState,
          oldPassword: msg,
        });
      }
      return false;
    } else if (id === 'newPassword' && value === '') {
      setErrors({
        ...initialState,
        newPassword: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'newPassword' && checkPasswordValidity(value)) {
      const msg = checkPasswordValidity(value);
      if (msg) {
        setErrors({
          ...initialState,
          newPassword: msg,
        });
      }
      return false;
    } else if (id === 'confirmNewPassword' && value === '') {
      setErrors({
        ...initialState,
        [id]: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'confirmNewPassword' && value !== inputs.newPassword) {
      setErrors({
        ...initialState,
        [id]: ErrorMessage.PSWD_NOT_MATCH,
      });
      return false;
    } else {
      setErrors({...initialState});
      return true;
    }
  };

  const validation = () => {
    if (inputs.oldPassword === '') {
      setErrors({
        ...initialState,
        oldPassword: ErrorMessage.REQ,
      });
      return false;
    } else if (checkPasswordValidity(inputs.oldPassword)) {
      const msg = checkPasswordValidity(inputs.oldPassword);
      if (msg) {
        setErrors({
          ...initialState,
          oldPassword: msg,
        });
      }
      return false;
    } else if (inputs.newPassword === '') {
      setErrors({
        ...initialState,
        newPassword: ErrorMessage.REQ,
      });
      return false;
    } else if (checkPasswordValidity(inputs.newPassword)) {
      const msg = checkPasswordValidity(inputs.newPassword);
      if (msg) {
        setErrors({
          ...initialState,
          newPassword: msg,
        });
      }
      return false;
    } else if (inputs.confirmNewPassword === '') {
      setErrors({
        ...initialState,
        confirmNewPassword: ErrorMessage.REQ,
      });
      return false;
    } else if (inputs.confirmNewPassword !== inputs.newPassword) {
      setErrors({
        ...initialState,
        confirmNewPassword: ErrorMessage.PSWD_NOT_MATCH,
      });
      return false;
    } else {
      setErrors({...initialState});
      return true;
    }
  };

  const onPressHandler = async () => {
    const isValid = validation();
    if (isValid) {
      try {
        const data = {
          oldPassword: inputs.oldPassword,
          newPassword: inputs.newPassword,
        };
        await ChangePasswordService(data);
        Alert.alert('', 'Password Changed Successfully!');
        setInputs(initialState);
      } catch (error: any) {
        Alert.alert('Error', error.response.data.errors[0].message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HeaderWithTitle title='Change Password' />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.body}>
            <InputwithIconComponent
              id={inputsConstant.oldPassword.id}
              handelTextChange={HandleInputsTextChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.oldPassword.iconFamily}
              iconName={inputsConstant.oldPassword.iconName}
              iconSize={inputsConstant.oldPassword.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.oldPassword.placeHolder}
              value={inputs.oldPassword}
              errorString={errors.oldPassword}
            />
            <InputwithIconComponent
              id={'newPassword'}
              handelTextChange={HandleInputsTextChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.password.iconFamily}
              iconName={inputsConstant.password.iconName}
              iconSize={inputsConstant.password.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.password.placeHolder}
              value={inputs.newPassword}
              errorString={errors.newPassword}
            />
            <InputwithIconComponent
              id={'confirmNewPassword'}
              handelTextChange={HandleInputsTextChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.confirmPassword.iconFamily}
              iconName={inputsConstant.confirmPassword.iconName}
              iconSize={inputsConstant.confirmPassword.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.confirmPassword.placeholder}
              value={inputs.confirmNewPassword}
              errorString={errors.confirmNewPassword}
            />
          </View>
        </KeyboardAwareScrollView>
        {isKeyboardVisible ? null : (
          <View style={styles.center}>
            <View style={styles.btnContainer}>
              <ButtonPrimary label="Save" handleBtnPress={onPressHandler} />
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  pageNameContainer: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(6.5)
        : responsiveScreenHeight(2),
    left: responsiveScreenWidth(15),
    alignItems: 'center',
  },
  pageName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: white,
  },
  body: {
    paddingTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4),
    flex: 1,
  },
  btnContainer: {
    width: '80%',
  },
  center: {
    marginVertical: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: responsiveScreenHeight(2),
  },
});
