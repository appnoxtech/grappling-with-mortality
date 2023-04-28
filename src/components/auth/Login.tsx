import React, {useContext, useEffect, useState} from 'react';
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
  colorPrimary,
  colorSecondary,
  white,
} from '../../../assests/Styles/GlobalTheme';
import {ErrorMessage, LoginHeading} from '../../utils/constants/authConstant';
import InputwithIconComponent from '../common/Inputs/InputwithIconComponent';
import {LoginInputsInitialState} from '../../utils/constants/authConstant';
import LoadIcon from '../common/LoadIcons';
import ButtonPrimary from '../common/buttons/ButtonPrimary';
import SocialLoginBtn from '../common/buttons/SocialLoginBtn';
import {EMAIL_REGEX} from '../../utils/constants/common';
import useLoginHook from '../../hooks/AuthHooks/LoginHook';
import {inputsConstant} from '../../utils/constants/authConstant';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoadingScreen from '../../screens/common/LoadingScreen';
import { useDispatch } from 'react-redux';

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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [rememberPswd, setRememberPswd] = useState(false);

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
    } else if (inputs.password.length <= 5) {
      setErrors({
        ...LoginInputsInitialState,
        password: ErrorMessage.PSWD_LENGTH,
      });
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
    } else if (id === 'password' && value.length <= 5) {
      setErrors({
        ...LoginInputsInitialState,
        password: ErrorMessage.PSWD_LENGTH,
      });
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
    // dispatch(SetIsLoadingState(false))
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
    <LoadingScreen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaProvider style={styles.container}>
          <View style={styles.container}>
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
              <Pressable
                onPress={() => setRememberPswd(!rememberPswd)}
                style={styles.rememberContainer}>
                <View style={styles.iconContainer}>
                  <LoadIcon
                    style={{}}
                    iconFamily={labels.mtIconFamily}
                    iconName={
                      rememberPswd
                        ? labels.mtCheckedIconName
                        : labels.mtIconName
                    }
                    size={labels.mtIconSize}
                    color={colorSecondary}
                  />
                </View>
                <Text style={styles.rememberText}>{LoginHeading.remember}</Text>
              </Pressable>
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
              {/* <View style={styles.loginOptionsContainer}>
            <View style={styles.line}>
              <View style={styles.loginOptionsTextContainer}>
                <Text style={styles.loginOptionsText}>
                  {LoginHeading.orLoginWith}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.mt_2]}>
            <View style={styles.socialBtnContainer}>
              <SocialLoginBtn label={labels.Google} type={labels.google} />
            </View>
            <View style={styles.socialBtnContainer}>
              <SocialLoginBtn label={labels.Facebook} type={labels.facebook} />
            </View>
          </View> */}
            </View>
          </View>
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
  inputContainer: {
    marginTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
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
