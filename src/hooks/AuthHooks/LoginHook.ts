import { useDispatch } from "react-redux"
import { loginData } from "../../interfaces/auth/authServiceInterface"
import { LoginServices } from "../../services/auth/AuthService"
import { Alert } from "react-native";
import { updateUserDetails, updateUserData } from "../../redux/reducers/userReducer";
import {saveUserData} from '../../utils/helperFunctions/auth';

const useLoginHook = () => {
    const dispatch = useDispatch();
    const LoginServiceHandler = async(data: loginData) => {
        try {
            const res = await LoginServices(data);
            const userInfo = res.data.data;
            saveUserData(userInfo);
            console.log('userInfo', userInfo);
            
            dispatch(updateUserDetails({fullName: userInfo.fullName, email: data.email, userType: userInfo.userType}));
            dispatch(updateUserData(true));
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message);
        }
    }
    return LoginServiceHandler;
}

export default useLoginHook;