import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {generateOTPService} from '../../services/common/OtpService';
import {useNavigation} from '@react-navigation/native';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import InputwithIconComponent from '../../components/common/Inputs/InputwithIconComponent';
import {inputsConstant} from '../../utils/constants/authConstant';
import {colorPrimary, colorSecondary, white} from '../../../assests/Styles/GlobalTheme';
import ButtonPrimary from '../../components/common/buttons/ButtonPrimary';
import { EMAIL_REGEX } from '../../utils/constants/common';

const initialState = {
  email: '',
};

const subTextInitialState = {
  email: '',
};

const labels = {
  resetPassword: 'Reset Password',
  sendEmail: 'Send me an email',
  heading:
    'Please enter the email address associated with your account. An OTP (One-Time Password) consisting of 4 digits will be sent to this email address for verification.',
};

const ResetPassword = () => {
  const [inputs, setInputs] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [subText, setSubText] = useState(subTextInitialState);
  const navigation = useNavigation();

  const handleChange = (value: string, id: string) => {
    setInputs(oldState => {
      return {
        ...oldState,
        [id]: value,
      };
    });
    validation(value, id);
  };

  const validation = (value: string, id: string) => {
    let state: boolean;
    if (id === 'email' && value === '') {
      state = false;
      setSubText({
        email: 'Email is Required',
      });
    } else if (id === 'email' && !EMAIL_REGEX.test(value)) {
      state = false;
      setSubText({
        email: 'Please enter a valid email',
      });
    } else {
      setSubText(subTextInitialState);
      state = true;
    }
    setIsActive(state);
  };


  const handleBtnPress = () => {
     if(inputs.email === '') {
        return setSubText({
          email: 'Email is Required',
        }); 
     } else if(!EMAIL_REGEX.test(inputs.email)) {
        return setSubText({
          email: 'Please enter a valid email',
        });
     } else {
      handleClick()
     }
  }
  const handleClick = async () => {
    try {
      const data = {
        email: inputs.email,
        type: 'GENERATE',
      };
      await generateOTPService(data);
      setInputs(initialState);
      setIsActive(false);
      navigation.navigate(
        'VerifyOtp' as never,
        {email: inputs.email, type: 'VERIFY', flow: 'passwordForget'} as never,
      );
      return;
    } catch (error: any) {
      console.log('errro', error);
      Alert.alert(error.response.data.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithBackBtn />
      <View style={styles.body}>
        <View style={styles.helpingTextContainer}>
          <Text style={styles.helpingText}>{labels.heading}</Text>
        </View>
        <InputwithIconComponent
          id={inputsConstant.email.id}
          handelTextChange={handleChange}
          iconColor={colorPrimary}
          iconFamily={inputsConstant.email.iconFamily}
          iconName={inputsConstant.email.iconName}
          iconSize={inputsConstant.email.iconSize}
          iconStyle={{}}
          placeholder={inputsConstant.email.placeHolder}
          value={inputs.email}
          errorString={subText.email}
        />
      </View>
      <View style={styles.btnContainer}>
        <ButtonPrimary
          isActive={isActive}
          handleBtnPress={handleBtnPress}
          label={labels.resetPassword}
        />
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2),
  },
  heading: {
    fontSize: responsiveFontSize(2.6),
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
  },
  helpingText: {
    fontSize: responsiveFontSize(2.1),
    marginBottom: responsiveScreenHeight(2),
    opacity: 0.7,
    color: colorPrimary,
  },
  body: {
    marginVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(2),
  },
  btnContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    width: '100%',
    position: 'absolute',
    bottom: responsiveScreenHeight(5),
  },
  helpingTextContainer: {
    paddingHorizontal: responsiveScreenWidth(1), 
  },
});
