import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colorPrimary, white} from '../../../assests/Styles/GlobalTheme';
import {TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import InputwithIconComponent from '../../components/common/Inputs/InputwithIconComponent';
import {
  ErrorMessage,
  RegisterInitialState,
  inputsConstant,
} from '../../utils/constants/authConstant';
import * as ImagePicker from 'react-native-image-picker';
import {EMAIL_REGEX} from '../../utils/constants/common';
import ButtonPrimary from '../../components/common/buttons/ButtonPrimary';
import { useSelector } from 'react-redux';
import { store } from '../../interfaces/reducer/state';

const path = '../../../assests/images/profile.jpg';
const errorObj = {
    fullName: '',
    email: ''
}
const EditProfile = () => {
  const {userDetails} = useSelector((state: store) => state.user);
  const RegisterInitialState = {
    fullName: userDetails.fullName,
    email: userDetails.email,
  };
  const [inputs, setInputs] = useState(RegisterInitialState);
  const [inputsError, setInputsError] = useState(errorObj);
 
  const HandleInputsTextChange = (text: string, id: string) => {
    setInputs({
      ...inputs,
      [id]: text,
    });
    OnTextChangeValidation(id, text);
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
    } else if (id === 'confirmPassowrd' && value === '') {
      setInputsError({
        ...RegisterInitialState,
        confirmPassowrd: ErrorMessage.REQ,
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

  console.log('userdetails', inputs);
  

  const onPressHandler = () => {};

  const handlePickerPress = async () => {
    await ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      const image = response.assets;
      if (image?.length) {
        const data = new FormData();
        data.append('file', {
          uri: image[0].uri,
          type: image[0].type,
          name: image[0].fileName,
        });
        console.log('image Data', data);
        // handleImageUpdload(data);
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderWithBackBtn>
        <View style={styles.pageNameContainer}>
          <Text style={styles.pageName}>Edit Profile</Text>
        </View>
      </HeaderWithBackBtn>
      <View style={styles.body}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handlePickerPress} style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require(path)}
              alt="user-profile"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputsContainer}>
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
        </View>
        <View style={styles.center}>
          <View style={styles.btnContainer}>
            <ButtonPrimary label="Save" handleBtnPress={onPressHandler} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

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
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(3),
    height: responsiveScreenHeight(10),
  },
  imageContainer: {
    width: responsiveScreenHeight(12),
    height: responsiveScreenHeight(12),
    borderRadius: responsiveScreenHeight(7),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: responsiveScreenHeight(7),
  },
  body: {
    flex: 1,
    paddingVertical: responsiveScreenHeight(3),
  },
  inputsContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    marginTop: responsiveScreenHeight(2),
  },
  btnContainer: {
    width: '65%',
  },
  center: {
    marginTop: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
