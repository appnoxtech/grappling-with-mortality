import {useDispatch} from 'react-redux';
import {loginData} from '../../interfaces/auth/authServiceInterface';
import {LoginServices} from '../../services/auth/AuthService';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {
  updateUserDetails,
  updateUserData,
} from '../../redux/reducers/userReducer';
import {saveUserData} from '../../utils/helperFunctions/auth';
import {SetIsLoadingState} from '../../redux/reducers/commonReducer';
import {generateOTPService} from '../../services/common/OtpService';

const useLoginHook = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  const LoginServiceHandler = async (data: loginData) => {
    try {
      dispatch(SetIsLoadingState(true));
      const res = await LoginServices(data);
      const userInfo = res.data.data;
      if (userInfo?.isEmailVerified) {
        dispatch(SetIsLoadingState(false));
        saveUserData(userInfo);
        console.log('userInfo', userInfo);
        if (userInfo?.image) {
          dispatch(
            updateUserDetails({
              fullName: userInfo.fullName,
              email: data.email,
              userType: userInfo.userType,
              image: userInfo.image,
            }),
          );
        } else {
          dispatch(
            updateUserDetails({
              fullName: userInfo.fullName,
              email: data.email,
              userType: userInfo.userType,
            }),
          );
        }
        dispatch(updateUserData(true));
      } else {
        const params = {
          email: data.email,
          type: 'GENERATE',
        };
        await generateOTPService(params);
        dispatch(SetIsLoadingState(false));
        Navigation.navigate(
          'VerifyOtp' as never,
          {email: data.email, type: 'VERIFY', flow: 'Signup'} as never,
        );
      }
    } catch (error: any) {
      dispatch(SetIsLoadingState(false));
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };
  return LoginServiceHandler;
};

export default useLoginHook;
