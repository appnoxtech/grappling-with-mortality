import { useDispatch } from "react-redux";
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { ssoData } from "../../interfaces/auth/authServiceInterface";
import { SsoService } from "../../services/auth/AuthService";
import { updateUserData, updateUserDetails } from "../../redux/reducers/userReducer";
import { Alert } from "react-native";

const useSocialAuthHook = () => {
    const dispatch = useDispatch();

    const SocialAuthenticationServiceHandler = async(data: ssoData) => {
        try {
            const res = await SsoService(data);
            const Data = res.data.data;
            console.log('Data', Data);
            
            const userInfo = {
                accessToken: Data.accessToken,
                fullName: Data.fullName,
                userId: Data.userId,
                image: Data.image
            };
            // console.log('userInfo', userInfo);
            
            // dispatch(updateUserDetails(userInfo));
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message)
        }
    }

    return SocialAuthenticationServiceHandler;
}

export default useSocialAuthHook;