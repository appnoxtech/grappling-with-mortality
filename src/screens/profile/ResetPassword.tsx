import {StyleSheet, Text, View} from 'react-native';
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

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ResetPassword = () => {
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

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
        ...errors,
        [id]: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'oldPassword' && value.length < 5) {
      setErrors({
        ...errors,
        [id]: ErrorMessage.PSWD_LENGTH,
      });
      return false;
    } else if(id === 'newPassword' && value === '') {
      setErrors({
        ...errors,
        [id]: ErrorMessage.REQ,
      });
      return false;
    } else if(id === 'newPassword' && value.length < 5) {
      setErrors({
        ...errors,
        [id]: ErrorMessage.PSWD_LENGTH,
      });
      return false;
    } else if(id === 'confirmNewPassword' && value === '') {
      setErrors({
        ...errors,
        [id]: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'confirmNewPassword' && value.length < 5) {
      setErrors({
        ...errors,
        [id]: ErrorMessage.PSWD_LENGTH,
      });
      return false;
    } else if (id === 'confirmNewPassword' && value !== inputs.newPassword) {
      setErrors({
        ...errors,
        [id]: ErrorMessage.PSWD_NOT_MATCH,
      });
      return false;
    } else {
      setErrors({...errors});
      return true;
    }
  };

  const onPressHandler = () => {};

  return (
    <View style={styles.container}>
      <HeaderWithBackBtn>
        <View style={styles.pageNameContainer}>
          <Text style={styles.pageName}>Change Password</Text>
        </View>
      </HeaderWithBackBtn>
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
          id={inputsConstant.confirmPassword.id}
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
          id={inputsConstant.confirmPassword.id}
          handelTextChange={HandleInputsTextChange}
          iconColor={colorPrimary}
          iconFamily={inputsConstant.confirmPassword.iconFamily}
          iconName={inputsConstant.confirmPassword.iconName}
          iconSize={inputsConstant.confirmPassword.iconSize}
          iconStyle={{}}
          placeholder={inputsConstant.confirmPassword.placeholder}
          value={inputs.newPassword}
          errorString={errors.newPassword}
        />
      </View>
      <View style={styles.center}>
        <View style={styles.btnContainer}>
          <ButtonPrimary label="Save" handleBtnPress={onPressHandler} />
        </View>
      </View>
    </View>
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
    top: responsiveScreenHeight(6.5),
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
});
