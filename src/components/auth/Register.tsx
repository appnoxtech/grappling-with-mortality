import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  colorGrey,
  colorPrimary,
  colorSecondary,
  white,
} from '../../../assests/Styles/GlobalTheme';
import {
  ErrorMessage,
  RegisterHeading,
  RegisterInitialState,
} from '../../utils/constants/authConstant';
import InputwithIconComponent from '../common/Inputs/InputwithIconComponent';
import ButtonPrimary from '../common/buttons/ButtonPrimary';
import SocialLoginBtn from '../common/buttons/SocialLoginBtn';
import {EMAIL_REGEX} from '../../utils/constants/common';
import useRegisterHook from '../../hooks/AuthHooks/RegisterHook';
import {inputsConstant} from '../../utils/constants/authConstant';

const labels = {
  findAccount: "Don't have an account? ",
  login: 'Login Now',
  register: 'Register',
  Google: 'Google',
  google: 'google',
  Facebook: 'Facebook',
  facebook: 'facebook',
};

interface props {
  handleLabelClick(label: string): void;
}

const Register: React.FC<props> = ({handleLabelClick}) => {
  const navigation = useNavigation();
  const handleRegisterService = useRegisterHook();
  const [inputs, setInputs] = useState(RegisterInitialState);
  const [inputsError, setInputsError] = useState(RegisterInitialState);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const HandleInputsTextChange = (text: string, id: string) => {
    setInputs({
      ...inputs,
      [id]: text,
    });
    OnTextChangeValidation(id, text);
  };

  const handleLoginNowClick = () => {
    handleLabelClick('Login');
  };

  const validation = () => {
    if (inputs.fullName === '') {
      setInputsError({
        ...RegisterInitialState,
        fullName: ErrorMessage.REQ,
      });
      return false;
    } else if (inputs.email === '') {
      setInputsError({
        ...RegisterInitialState,
        email: ErrorMessage.EMAIL_REQ,
      });
      return false;
    } else if (!EMAIL_REGEX.test(inputs.email)) {
      setInputsError({
        ...RegisterInitialState,
        email: ErrorMessage.INVD_EMAIL,
      });
      return false;
    } else if (inputs.password === '') {
      setInputsError({
        ...RegisterInitialState,
        password: ErrorMessage.PSWD_REQ,
      });
      return false;
    } else if (inputs.password.length <= 5) {
      setInputsError({
        ...RegisterInitialState,
        password: ErrorMessage.PSWD_LENGTH,
      });
      return false;
    } else if (inputs.confirmPassowrd !== inputs.password) {
      setInputsError({
        ...RegisterInitialState,
        confirmPassowrd: ErrorMessage.PSWD_NOT_MATCH,
      });
      return false;
    } else {
      setInputsError(RegisterInitialState);
      return true;
    }
  };

  const OnTextChangeValidation = (id: string, value: string) => {
    if (id === 'fullName' && value === '') {
      setInputsError({
        ...RegisterInitialState,
        fullName: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'email' && value === '') {
      setInputsError({
        ...RegisterInitialState,
        email: ErrorMessage.EMAIL_REQ,
      });
      return false;
    } else if (id === 'email' && !EMAIL_REGEX.test(value)) {
      setInputsError({
        ...RegisterInitialState,
        email: ErrorMessage.INVD_EMAIL,
      });
      return false;
    } else if (id === 'password' && value === '') {
      setInputsError({
        ...RegisterInitialState,
        password: ErrorMessage.PSWD_REQ,
      });
      return false;
    } else if (id === 'password' && value.length <= 5) {
      setInputsError({
        ...RegisterInitialState,
        password: ErrorMessage.PSWD_LENGTH,
      });
      return false;
    } else if (id === 'confirmPassowrd' && value !== inputs.password) {
      setInputsError({
        ...RegisterInitialState,
        confirmPassowrd: ErrorMessage.PSWD_NOT_MATCH,
      });
      return false;
    } else {
      setInputsError(RegisterInitialState);
      return true;
    }
  };

  const handleRegisterBtnClick = async () => {
    const isValid = validation();
    if (isValid) {
      // login service api call
      const {fullName, email, password} = inputs;
      const userType = 'CUSTOMER';
      handleRegisterService({fullName, email, password, userType});
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Text style={styles.primaryHeading}>
            {RegisterHeading.primaryHeading}
          </Text>
          <View style={styles.inputContainer}>
            <InputwithIconComponent
              id={inputsConstant.fullName.id}
              handelTextChange={HandleInputsTextChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.fullName.iconFamily}
              iconName={inputsConstant.fullName.iconName}
              iconSize={inputsConstant.fullName.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.fullName.placeholder}
              value={inputs.fullName}
              errorString={inputsError.fullName}
            />
            <InputwithIconComponent
              id={inputsConstant.email.id}
              handelTextChange={HandleInputsTextChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.email.iconFamily}
              iconName={inputsConstant.email.iconName}
              iconSize={inputsConstant.email.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.email.placeHolder}
              value={inputs.email}
              errorString={inputsError.email}
            />
            <InputwithIconComponent
              id={inputsConstant.password.id}
              handelTextChange={HandleInputsTextChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.password.iconFamily}
              iconName={inputsConstant.password.iconName}
              iconSize={inputsConstant.password.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.password.placeHolder}
              value={inputs.password}
              errorString={inputsError.password}
            />
            <InputwithIconComponent
              id={inputsConstant.confirmPassword.id}
              handelTextChange={HandleInputsTextChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.confirmPassword.iconFamily}
              iconName={inputsConstant.confirmPassword.iconName}
              iconSize={inputsConstant.confirmPassword.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.confirmPassword.placeholder}
              value={inputs.confirmPassowrd}
              errorString={inputsError.confirmPassowrd}
            />
          </View>
          <View style={styles.btnsContainer}>
            <View style={styles.primaryBtnContainer}>
              <ButtonPrimary
                handleBtnPress={handleRegisterBtnClick}
                label={labels.register}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {isKeyboardVisible ? null : (
          <View style={styles.footer}>
            <Text style={styles.footerTextSuggestion}>
              {labels.findAccount}
            </Text>
            <Pressable onPress={handleLoginNowClick}>
              <Text style={styles.navText}>{labels.login}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: white,
  },
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: responsiveScreenHeight(2),
  },
  contentContainer: {
    paddingBottom: responsiveScreenHeight(2),
  },
  primaryHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: colorSecondary,
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    marginTop: responsiveScreenHeight(2),
  },
  othersOptionsContainer: {
    paddingHorizontal: responsiveScreenWidth(4.5),
    paddingVertical: responsiveScreenHeight(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(1),
    alignItems: 'center',
  },
  iconContainer: {},
  forgetPswdContainer: {
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: responsiveScreenWidth(2),
  },
  forgetPswdText: {
    fontSize: responsiveFontSize(1.9),
    color: 'rgba(255,0,0,0.7)',
    fontWeight: 'bold',
  },
  rememberText: {
    fontSize: responsiveFontSize(1.8),
    color: colorSecondary,
    fontWeight: 'bold',
  },
  btnsContainer: {
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnContainer: {
    width: responsiveScreenWidth(75),
  },
  line: {
    width: responsiveScreenWidth(85),
    borderColor: 'rgba(128,128,128,0.4)',
    borderWidth: 1,
    position: 'relative',
  },
  loginOptionsContainer: {
    marginTop: responsiveScreenHeight(5),
  },
  loginOptionsTextContainer: {
    width: responsiveScreenWidth(40),
    position: 'absolute',
    top: responsiveScreenHeight(-1.5),
    left: responsiveScreenWidth(23),
    backgroundColor: white,
  },
  loginOptionsText: {
    color: 'rgba(128,128,128,0.4)',
    fontSize: responsiveFontSize(2.3),
    fontWeight: '500',
    textAlign: 'center',
  },
  mt_2: {
    marginTop: responsiveScreenHeight(0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveScreenWidth(4),
    alignItems: 'center',
  },
  socialBtnContainer: {
    width: '42%',
    paddingVertical: responsiveScreenHeight(1),
  },
  footer: {
    paddingVertical: responsiveScreenHeight(3),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerTextSuggestion: {
    fontSize: responsiveFontSize(2.1),
    color: colorGrey,
  },
  navText: {
    color: colorSecondary,
    fontSize: responsiveFontSize(2.1),
  },
});
