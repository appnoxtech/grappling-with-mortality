import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {
  colorGrey,
  colorSecondary,
  white,
} from '../../../assests/Styles/GlobalTheme';
import {ErrorMessage, LoginHeading} from '../../utils/constants/authConstant';
import InputwithIconComponent from '../common/Inputs/InputwithIconComponent';
import {LoginInputsInitialState} from '../../utils/constants/authConstant';
import LoadIcon from '../common/LoadIcons';
import ButtonPrimary from '../common/buttons/ButtonPrimary';
import {EMAIL_REGEX, PSWD_REGEX} from '../../utils/constants/common';
import useLoginHook from '../../hooks/AuthHooks/LoginHook';
import {inputsConstant} from '../../utils/constants/authConstant';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoadingScreen from '../../screens/common/LoadingScreen';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useKeyboardVisibleListener from '../../hooks/CommonHooks/isKeyboardVisibleHook';
import { SetIsLoadingState } from '../../redux/reducers/commonReducer';
import { checkPasswordValidity } from '../../utils/helperFunctions/passwordValidation';

const labels = {
  login: 'Login',
  noAccount: "Don't have an account? ",
  register: 'Register Now',
  Google: 'Google',
  google: 'google',
  Facebook: 'Facebook',
  facebook: 'facebook',
  mtIconFamily: 'MaterialIcons',
  mtIconName: 'check-box-outline-blank',
  mtCheckedIconName: 'check-box',
  mtIconSize: 20,
};

interface props {
  handleLabelClick(label: string): void;
}

const Login: React.FC<props> = ({handleLabelClick}) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(LoginInputsInitialState);
  const [errors, setErrors] = useState(LoginInputsInitialState);
  const isKeyboardVisible = useKeyboardVisibleListener();

  const navigation = useNavigation();

  const LoginServiceHandler = useLoginHook();

  const HandleInputsTextChange = (text: string, id: string) => {
    setInputs({
      ...inputs,
      [id]: text,
    });
    OnTextChangeVerificaation(id, text);
  };

  const handleRegisterNowClick = () => {
    handleLabelClick('Register');
  };

  const Validation = () => {
    if (inputs.email === '') {
      setErrors({
        ...LoginInputsInitialState,
        email: ErrorMessage.REQ,
      });
      return false;
    } else if (!EMAIL_REGEX.test(inputs.email)) {
      setErrors({
        ...LoginInputsInitialState,
        email: ErrorMessage.INVD_EMAIL,
      });
      return false;
    } else if (inputs.password === '') {
      setErrors({
        ...LoginInputsInitialState,
        password: ErrorMessage.REQ,
      });
      return false;
    } else if (checkPasswordValidity(inputs.password)) {
      const msg = checkPasswordValidity(inputs.password);
      if(msg){
        setErrors({
          ...LoginInputsInitialState,
          password: msg,
        });
      }
      return false;
    } else {
      setErrors(LoginInputsInitialState);
      return true;
    }
  };

  const OnTextChangeVerificaation = (id: string, value: string) => {
    if (id === 'email' && value === '') {
      setErrors({
        ...LoginInputsInitialState,
        email: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'email' && !EMAIL_REGEX.test(value)) {
      setErrors({
        ...LoginInputsInitialState,
        email: ErrorMessage.INVD_EMAIL,
      });
      return false;
    } else if (id === 'password' && value === '') {
      setErrors({
        ...LoginInputsInitialState,
        password: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'password' && checkPasswordValidity(value)) {
      const msg = checkPasswordValidity(value);
      if(msg){
        setErrors({
          ...LoginInputsInitialState,
          password: msg,
        });
      }
      return false;
    } else {
      setErrors(LoginInputsInitialState);
      return true;
    }
  };

  const handleLoginBtnPress = () => {
    const isValid = Validation();
    if (isValid) {
      LoginServiceHandler(inputs);
    }
  };

  const handleForgetPasswordClick = () => {
    navigation.navigate('ResetPassword' as never);
  };

  useEffect(() => {
     dispatch(SetIsLoadingState(false))
  }, [])

  return (
    <LoadingScreen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaProvider style={styles.container}>
          <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
            <Text style={styles.primaryHeading}>
              {LoginHeading.primaryHeading}
            </Text>
            <View style={styles.inputContainer}>
              <InputwithIconComponent
                id={inputsConstant.email.id}
                handelTextChange={HandleInputsTextChange}
                iconColor={colorSecondary}
                iconFamily={inputsConstant.email.iconFamily}
                iconName={inputsConstant.email.iconName}
                iconSize={inputsConstant.email.iconSize}
                iconStyle={{}}
                placeholder={inputsConstant.email.placeHolder}
                value={inputs.email}
                errorString={errors.email}
              />
              <InputwithIconComponent
                id={inputsConstant.password.id}
                handelTextChange={HandleInputsTextChange}
                iconColor={colorSecondary}
                iconFamily={inputsConstant.password.iconFamily}
                iconName={inputsConstant.password.iconName}
                iconSize={inputsConstant.password.iconSize}
                iconStyle={{}}
                placeholder={inputsConstant.password.placeHolder}
                value={inputs.password}
                errorString={errors.password}
              />
            </View>
            <View style={styles.othersOptionsContainer}>
              <View style={styles.forgetPswdContainer}>
                <TouchableOpacity onPress={handleForgetPasswordClick}>
                  <Text style={styles.forgetPswdText}>
                    {LoginHeading.forget}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnsContainer}>
              <View style={styles.primaryBtnContainer}>
                <ButtonPrimary
                  handleBtnPress={handleLoginBtnPress}
                  label={labels.login}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          {isKeyboardVisible ? null : (
            <View style={styles.footer}>
              <Text style={styles.footerTextSuggestion}>
                {labels.noAccount}
              </Text>
              <Pressable onPress={handleRegisterNowClick}>
                <Text style={styles.navText}>{labels.register}</Text>
              </Pressable>
            </View>
          )}
        </SafeAreaProvider>
      </TouchableWithoutFeedback>
    </LoadingScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: responsiveScreenHeight(2),
  },
  primaryHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: colorSecondary,
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: responsiveScreenHeight(2),
  },
  inputContainer: {
    marginTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
  },
  othersOptionsContainer: {
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1.5),
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    fontSize: responsiveFontSize(1.95),
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
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500',
    textAlign: 'center',
  },
  mt_2: {
    marginTop: responsiveScreenHeight(1),
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
