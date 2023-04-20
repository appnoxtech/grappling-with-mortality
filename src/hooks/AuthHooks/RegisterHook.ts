import { Alert } from "react-native";
import { signupData } from "../../interfaces/auth/authServiceInterface"
import { RegisterService } from "../../services/auth/AuthService"

const useRegisterHook = () => {
    const handleRegisterService = async(data: signupData) => {
        try {
            const res = await RegisterService(data);
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message)
        }
    }
    return handleRegisterService;
}

export default useRegisterHook;
