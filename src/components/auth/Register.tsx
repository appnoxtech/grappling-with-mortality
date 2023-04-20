import React, {useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  colorGrey,
  colorPrimary,
  colorSecondary,
  white,
} from '../../../assests/Styles/GlobalTheme';
import {
  RegisterHeading,
  RegisterInitialState,
} from '../../utils/constants/authConstant';
import InputwithIconComponent from '../common/Inputs/InputwithIconComponent';
import ButtonPrimary from '../common/buttons/ButtonPrimary';
import SocialLoginBtn from '../common/buttons/SocialLoginBtn';
import {EMAIL_REGEX} from '../../utils/constants/common';

const Register = () => {
  const [inputs, setInputs] = useState(RegisterInitialState);
  const [inputsError, setInputsError] = useState(RegisterInitialState);

  const HandleInputsTextChange = (text: string, id: string) => {
    setInputs({
      ...inputs,
      [id]: text,
    });
  };

  const validation = () => {
    const error = RegisterInitialState;
    if (inputs.fullName === '') {
      setInputsError({
        ...RegisterInitialState,
        fullName: 'Required !',
      });
      return false;
    } else if (inputs.email === '') {
      setInputsError({
        ...RegisterInitialState,
        email: 'Email is required !',
      });
      return false;
    } else if (!EMAIL_REGEX.test(inputs.email)) {
      setInputsError({
        ...RegisterInitialState,
        email: 'Please enter a valid email.',
      });
      return false;
    } else if (inputs.password === '') {
      setInputsError({
        ...RegisterInitialState,
        password: 'Passowrd is required !',
      });
      return false;
    } else if (inputs.password.length <= 5) {
      error.password = 'Password length must be of 6 characters.';
      return false;
    } else if (inputs.confirmPassowrd !== inputs.password) {
      error.confirmPassowrd = 'Password not match.';
      return false;
    }else {

    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.primaryHeading}>
          {RegisterHeading.primaryHeading}
        </Text>
        <View style={styles.inputContainer}>
          <InputwithIconComponent
            id="fullName"
            handelTextChange={HandleInputsTextChange}
            iconColor={colorPrimary}
            iconFamily="FontAwesome5"
            iconName="user-circle"
            iconSize={20}
            iconStyle={{}}
            placeholder="Full Name"
            value={inputs.fullName}
          />
          <InputwithIconComponent
            id="email"
            handelTextChange={HandleInputsTextChange}
            iconColor={colorPrimary}
            iconFamily="MaterialCommunityIcons"
            iconName="email"
            iconSize={20}
            iconStyle={{}}
            placeholder="Email"
            value={inputs.email}
          />
          <InputwithIconComponent
            id="password"
            handelTextChange={HandleInputsTextChange}
            iconColor={colorPrimary}
            iconFamily="FontAwesome"
            iconName="lock"
            iconSize={20}
            iconStyle={{}}
            placeholder="Password"
            value={inputs.password}
          />
          <InputwithIconComponent
            id="confirmPassowrd"
            handelTextChange={HandleInputsTextChange}
            iconColor={colorPrimary}
            iconFamily="FontAwesome"
            iconName="lock"
            iconSize={20}
            iconStyle={{}}
            placeholder="Confirm Password"
            value={inputs.confirmPassowrd}
          />
        </View>
        <View style={styles.btnsContainer}>
          <View style={styles.primaryBtnContainer}>
            <ButtonPrimary label="Register" />
          </View>
          <View style={styles.loginOptionsContainer}>
            <View style={styles.line}>
              <View style={styles.loginOptionsTextContainer}>
                <Text style={styles.loginOptionsText}>
                  {RegisterHeading.orRegisterWith}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.mt_2]}>
            <View style={styles.socialBtnContainer}>
              <SocialLoginBtn label="Google" type="google" />
            </View>
            <View style={styles.socialBtnContainer}>
              <SocialLoginBtn label="Facebook" type="facebook" />
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerTextSuggestion}>
              {"Don't have an account? "}
            </Text>
            <Pressable>
              <Text style={styles.navText}>Login Now</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    paddingTop: responsiveScreenHeight(2),
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
