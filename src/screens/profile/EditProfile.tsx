import {
  Alert,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {ErrorMessage, inputsConstant} from '../../utils/constants/authConstant';
import * as ImagePicker from 'react-native-image-picker';
import {EMAIL_REGEX} from '../../utils/constants/common';
import ButtonPrimary from '../../components/common/buttons/ButtonPrimary';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import {ImageUploadService} from '../../services/common/ImageUploadService';
import useUpdateUserProfileHook from '../../hooks/User/UpdateProfileHandler';
import {TouchableWithoutFeedback} from 'react-native';
import useKeyboardVisibleListener from '../../hooks/CommonHooks/isKeyboardVisibleHook';

const path = '../../../assests/images/profile.jpg';

const errorObj = {
  fullName: '',
  email: '',
};

interface updatedData {
  fullName: string;
  image: string;
}

const EditProfile = () => {
  const {userDetails} = useSelector((state: store) => state.user);
  const UpdateUserProfileServiceHandler = useUpdateUserProfileHook();
  const isKeyboardVisible = useKeyboardVisibleListener();

  const RegisterInitialState = {
    image: '',
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
        ...errorObj,
        fullName: ErrorMessage.REQ,
      });
      return false;
    } else if (id === 'email' && value === '') {
      setInputsError({
        ...errorObj,
        email: ErrorMessage.EMAIL_REQ,
      });
      return false;
    } else if (id === 'email' && !EMAIL_REGEX.test(value)) {
      setInputsError({
        ...errorObj,
        email: ErrorMessage.INVD_EMAIL,
      });
      return false;
    } else {
      setInputsError(errorObj);
      return true;
    }
  };

  const validation = () => {
    if (inputs.fullName === '') {
      setInputsError({
        ...errorObj,
        fullName: ErrorMessage.REQ,
      });
      return false;
    } else if (inputs.email === '') {
      setInputsError({
        ...errorObj,
        email: ErrorMessage.EMAIL_REQ,
      });
      return false;
    } else if (!EMAIL_REGEX.test(inputs.email)) {
      setInputsError({
        ...errorObj,
        email: ErrorMessage.INVD_EMAIL,
      });
      return false;
    } else {
      setInputsError(errorObj);
      return true;
    }
  };

  const onPressHandler = async (data: updatedData) => {
    const isValid = validation();
    if (isValid) {
      await UpdateUserProfileServiceHandler(data);
    } else {
      return;
    }
  };

  const handleProfileSaveBtnPress = async () => {
    if (userDetails.fullName !== inputs.fullName) {
      const updatedData = {
        fullName: inputs.fullName,
        image: inputs.image,
      };
      const isValid = validation();
      if (isValid) {
        await UpdateUserProfileServiceHandler(updatedData);
        Alert.alert('', 'Username updated successfully!');
      } else {
        return;
      }
      
    }
  };

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
        handleImageUpdload(data);
      }
    });
  };

  const handleImageUpdload = async (image: any) => {
    try {
      const res = await ImageUploadService(image);
      console.log('res', res.data);
      const {data} = res.data;
      const imageUrl = data.baseUrl + data.imagePath;
      setInputs({...inputs, image: imageUrl});
      const updatedData = {
        fullName: inputs.fullName,
        image: imageUrl,
      };
      await onPressHandler(updatedData);
      Alert.alert('', 'Profile Picture updated Successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.response.data.msg);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <HeaderWithBackBtn>
          <View style={styles.pageNameContainer}>
            <Text style={styles.pageName}>Edit Profile</Text>
          </View>
        </HeaderWithBackBtn>
        <View style={styles.body}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={handlePickerPress}
              style={styles.imageContainer}>
              {userDetails?.image ? (
                <Image
                  style={styles.image}
                  source={{uri: userDetails?.image}}
                  alt="user-profile"
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require(path)}
                  alt="user-profile"
                />
              )}
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
              isEditable={false}
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
        </View>
        {!isKeyboardVisible ? (
          <View style={styles.center}>
            <View style={styles.btnContainer}>
              <ButtonPrimary
                label="Save"
                handleBtnPress={handleProfileSaveBtnPress}
              />
            </View>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
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
    top:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(6.5)
        : responsiveScreenHeight(1.7),
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
    width: '85%',
  },
  center: {
    marginVertical: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
