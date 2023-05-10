import { useDispatch } from "react-redux"
import { loginData } from "../../interfaces/auth/authServiceInterface"
import { LoginServices } from "../../services/auth/AuthService"
import { Alert } from "react-native";
import { updateUserDetails, updateUserData } from "../../redux/reducers/userReducer";
import {saveUserData} from '../../utils/helperFunctions/auth';
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";

const useLoginHook = () => {
    const dispatch = useDispatch();

    const LoginServiceHandler = async(data: loginData) => {
        try {
            dispatch(SetIsLoadingState(true))
            const res = await LoginServices(data);
            dispatch(SetIsLoadingState(false))
            const userInfo = res.data.data;
            saveUserData(userInfo);
            if(userInfo?.image){
                dispatch(updateUserDetails({fullName: userInfo.fullName, email: data.email, userType: userInfo.userType, image: userInfo.image}));
            } else {
                dispatch(updateUserDetails({fullName: userInfo.fullName, email: data.email, userType: userInfo.userType}));
            }
            dispatch(updateUserData(true));
            
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message);
            dispatch(SetIsLoadingState(false))
        }
    }
    return LoginServiceHandler;
}

export default useLoginHook;