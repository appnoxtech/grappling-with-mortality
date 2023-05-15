import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {ResetPasswordServices} from '../../services/auth/AuthService';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import {ErrorMessage, inputsConstant} from '../../utils/constants/authConstant';
import InputwithIconComponent from '../../components/common/Inputs/InputwithIconComponent';
import {colorPrimary} from '../../../assests/Styles/GlobalTheme';
import ButtonPrimary from '../../components/common/buttons/ButtonPrimary';
import {resetPassword} from '../../interfaces/auth/authServiceInterface';
import useKeyboardVisibleListener from '../../hooks/CommonHooks/isKeyboardVisibleHook';
import LoadingScreen from '../common/LoadingScreen';
import { useDispatch } from 'react-redux';
import { SetIsLoadingState } from '../../redux/reducers/commonReducer';

const initialState = {
  password: '',
  confirmPassowrd: '',
};

const subText = {
  password: '',
  confirmPassowrd: '',
};

const ChangePassword = ({route}: any) => {
  const NavigateTo = useNavigation();
  const isKeyboardVisible = useKeyboardVisibleListener();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initialState);
  const [subTexts, setSubTexts] = useState(subText);
  const [isActive, setIsActive] = useState(false);
  const {email, otp} = route.params;
  

  const handleChange = (value: string, id: string) => {
    setInputs(oldState => {
      return {
        ...oldState,
        [id]: value,
      };
    });
    OnChangeTextValidation(value, id);
  };

  const OnChangeTextValidation = (value: string, id: string) => {
    let state: boolean;
    if (id === 'password' && value === '') {
      state = false;
      setSubTexts({
        ...subTexts,
        password: ErrorMessage.REQ,
      });
    } else if (id === 'password' && value.length < 5) {
      state = false;
      setSubTexts({
        ...subTexts,
        password: ErrorMessage.PSWD_LENGTH,
      });
    } else if (id === 'confirmPassword' && value === '') {
      state = false;
      setSubTexts({
        ...subTexts,
        password: '',
        confirmPassowrd: ErrorMessage.REQ,
      });
    } else if (id === 'confirmPassowrd' && value.length < 5) {
      state = false;
      setSubTexts({
        ...subTexts,
        password: '',
        confirmPassowrd: ErrorMessage.PSWD_LENGTH,
      });
    } else if (id === 'confirmPassowrd' && inputs.password !== value) {
      state = false;
      setSubTexts({
        ...subTexts,
        password: '',
        confirmPassowrd: ErrorMessage.PSWD_NOT_MATCH,
      });
    } else {
      state = true;
      setSubTexts(subText);
    }
    setIsActive(state);
  };

  const validation = () => {
    let state: boolean;
    if (inputs.password === '') {
      state = false;
      setSubTexts({
        ...subTexts,
        password: ErrorMessage.REQ,
      });
    } else if (inputs.password.length < 5) {
      state = false;
      setSubTexts({
        ...subTexts,
        password: ErrorMessage.PSWD_LENGTH,
      });
    } else if (inputs.confirmPassowrd === '') {
      state = false;
      setSubTexts({
        ...subTexts,
        password: '',
        confirmPassowrd: ErrorMessage.REQ,
      });
    } else if (inputs.confirmPassowrd.length < 5) {
      state = false;
      setSubTexts({
        ...subTexts,
        password: '',
        confirmPassowrd: ErrorMessage.PSWD_LENGTH,
      });
    } else if (inputs.confirmPassowrd !== inputs.password) {
      state = false;
      setSubTexts({
        ...subTexts,
        password: '',
        confirmPassowrd: ErrorMessage.PSWD_NOT_MATCH,
      });
    } else {
      state = true;
      setSubTexts(subText);
    }
    return state;
  };

  const handleClick = async () => {
    const isValid = validation();
    if (isValid) {
      try {
        dispatch(SetIsLoadingState(true));
        const data: resetPassword = {
          email,
          otp: parseInt(otp, 10),
          password: inputs.password,
        };
        await ResetPasswordServices(data);
        dispatch(SetIsLoadingState(false));
        Alert.alert('Password Reset');
        NavigateTo.navigate('LandingPage' as never);
      } catch (error) {
        console.log('Error', error);
        dispatch(SetIsLoadingState(false));
      }
    }
  };

  return (
    <LoadingScreen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <HeaderWithBackBtn />
          <View style={styles.body}>
            <Text style={styles.primaryText}>Create New Password</Text>
            <Text style={styles.subText}>
              Make sure your password is five or more characters long
            </Text>
          </View>
          <View style={styles.textContainer}>
            <InputwithIconComponent
              id={inputsConstant.password.id}
              handelTextChange={handleChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.password.iconFamily}
              iconName={inputsConstant.password.iconName}
              iconSize={inputsConstant.password.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.password.placeHolder}
              value={inputs.password}
              errorString={subTexts.password}
            />
            <InputwithIconComponent
              id={inputsConstant.confirmPassword.id}
              handelTextChange={handleChange}
              iconColor={colorPrimary}
              iconFamily={inputsConstant.confirmPassword.iconFamily}
              iconName={inputsConstant.confirmPassword.iconName}
              iconSize={inputsConstant.confirmPassword.iconSize}
              iconStyle={{}}
              placeholder={inputsConstant.confirmPassword.placeholder}
              value={inputs.confirmPassowrd}
              errorString={subTexts.confirmPassowrd}
            />
          </View>
          {isKeyboardVisible ? null : (
            <View style={styles.btnContainer}>
              <ButtonPrimary
                handleBtnPress={handleClick}
                label="Reset Password"
                isActive={isActive}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </LoadingScreen>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.6),
    textAlign: 'center',
  },
  body: {
    marginVertical: responsiveScreenHeight(4),
    paddingHorizontal: responsiveScreenWidth(4),
  },
  textContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    flex: 1,
  },
  primaryText: {
    // fontFamily: 'NunitoSans-SemiBold',
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveScreenHeight(1),
  },
  subText: {
    fontSize: responsiveFontSize(2),
    // fontFamily: 'NunitoSans-Regular',
    opacity: 0.4,
  },
  btnContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    marginVertical: responsiveScreenHeight(5),
  },
});
