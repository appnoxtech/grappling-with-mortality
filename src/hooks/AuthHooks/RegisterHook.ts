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
      navigation.navigate(
        'VerifyOtp' as never,
        {email: data.email, type: 'VERIFY', flow: 'Signup'} as never,
      );
      dispatch(SetIsLoadingState(false));
    } catch (error: any) {
      Alert.alert('Error', error.response.data.errors[0].message);
      dispatch(SetIsLoadingState(false));
    }
  };
  return handleRegisterService;
};

export default useRegisterHook;
