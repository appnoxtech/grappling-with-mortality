import { Alert } from "react-native";
import { signupData } from "../../interfaces/auth/authServiceInterface"
import { RegisterService } from "../../services/auth/AuthService"
import {useNavigation} from '@react-navigation/native';

const useRegisterHook = () => {
    const navigation = useNavigation();
    const handleRegisterService = async(data: signupData) => {
        try {
        await RegisterService(data);
            navigation.navigate('VerifyOtp' as never, {email: data.email, type: 'VERIFY', flow: 'Signup'} as never);
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message)
        }
    }
    return handleRegisterService;
}

export default useRegisterHook;
