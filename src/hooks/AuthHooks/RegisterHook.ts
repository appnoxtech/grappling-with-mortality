import {Alert} from 'react-native';
import {signupData} from '../../interfaces/auth/authServiceInterface';
import {RegisterService} from '../../services/auth/AuthService';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SetIsLoadingState } from '../../redux/reducers/commonReducer';

const useRegisterHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegisterService = async (data: signupData) => {
    try {
      dispatch(SetIsLoadingState(true));
      await RegisterService(data);
      dispatch(SetIsLoadingState(false));
      navigation.navigate(
        'VerifyOtp' as never,
        {email: data.email, type: 'VERIFY', flow: 'Signup'} as never,
      );
    } catch (error: any) {
      dispatch(SetIsLoadingState(false));
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };
  return handleRegisterService;
};

export default useRegisterHook;