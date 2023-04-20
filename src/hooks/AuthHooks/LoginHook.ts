import { useDispatch } from "react-redux"
import { loginData } from "../../interfaces/auth/authServiceInterface"
import { LoginServices } from "../../services/auth/AuthService"
import { Alert } from "react-native";
import { updateUserDetails } from "../../redux/reducers/userReducer";

const useLoginHook = () => {
    const dispatch = useDispatch();
    const LoginServiceHandler = async(data: loginData) => {
        try {
            const res = await LoginServices(data);
            const userInfo = res.data.data;
            dispatch(updateUserDetails(userInfo));
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message);
        }
    }
    return LoginServiceHandler;
}

export default useLoginHook;