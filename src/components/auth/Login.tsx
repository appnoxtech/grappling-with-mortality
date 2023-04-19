import React, {useState} from 'react';
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
import {
  colorGrey,
  colorPrimary,
  colorSecondary,
  white,
} from '../../../assests/Styles/GlobalTheme';
import {LoginHeading} from '../../utils/constants/authConstant';
import InputwithIconComponent from '../common/Inputs/InputwithIconComponent';
import {LoginInputsInitialState} from '../../utils/constants/authConstant';
import LoadIcon from '../common/LoadIcons';
import ButtonPrimary from '../common/buttons/ButtonPrimary';
import SocialLoginBtn from '../common/buttons/SocialLoginBtn';

const Login = () => {
  const [inputs, setInputs] = useState(LoginInputsInitialState);
  const HandleInputsTextChange = (text: string, id: string) => {
    setInputs({
      ...inputs,
      [id]: text,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.primaryHeading}>{LoginHeading.primaryHeading}</Text>
        <View style={styles.inputContainer}>
          <InputwithIconComponent
            id="email"
            handelTextChange={HandleInputsTextChange}
            iconColor={colorPrimary}
            iconFamily="MaterialCommunityIcons"
            iconName="email"
            iconSize={25}
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
            iconSize={25}
            iconStyle={{}}
            placeholder="Password"
            value={inputs.password}
          />
        </View>
        <View style={styles.othersOptionsContainer}>
          <View style={styles.rememberContainer}>
            <View style={styles.iconContainer}>
              <LoadIcon
                style={{}}
                iconFamily="MaterialIcons"
                iconName="check-box-outline-blank"
                size={20}
                color={colorSecondary}
              />
            </View>
            <Text style={styles.rememberText}>{LoginHeading.remember}</Text>
          </View>
          <View style={styles.forgetPswdContainer}>
            <TouchableOpacity>
              <Text style={styles.forgetPswdText}>{LoginHeading.forget}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <View style={styles.primaryBtnContainer}>
            <ButtonPrimary label="Login" />
          </View>
          <View style={styles.loginOptionsContainer}>
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
              <Text style={styles.navText}>Register Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
