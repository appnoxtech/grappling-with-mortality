import { Alert } from "react-native";
import { UpdateUserProfileService } from "../../services/user/UpdateProfileService"
import { updatedUserProfile } from "../../interfaces/user/updateProfile.service.interface";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../interfaces/reducer/state";
import { updateUserDetails } from "../../redux/reducers/userReducer";

const useUpdateUserProfileHook = () => {
    const {userDetails} = useSelector((store: store) => store.user);
    const dispatch = useDispatch();

    const UpdateUserProfileServiceHandler = async (data: updatedUserProfile) => {
        try {
            await UpdateUserProfileService(data);
            if(data.image) {
                dispatch(updateUserDetails({...userDetails, fullName: data.fullName, image: data.image}));
            } else {
                dispatch(updateUserDetails({...userDetails, fullName: data.fullName}));
            }
            Alert.alert('', 'Profile Updated Successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message);
        }
    };

    return UpdateUserProfileServiceHandler
};

export default useUpdateUserProfileHook;