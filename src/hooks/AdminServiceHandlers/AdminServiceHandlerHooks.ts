import { useDispatch } from "react-redux";
import { GetAuthorListServices, GetUserListServices } from "../../services/admin/AdminServices";
import { UdateUserList, UpdateAuthorList } from "../../redux/reducers/adminReducer";
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";
import { Alert } from "react-native";

const useAdminServiceHandlers = () => {
    const dispatch = useDispatch();

    const GetUserListServiceHandler = async() => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await GetUserListServices();
            const {data} = res.data;
            dispatch(SetIsLoadingState(false));
            if(data.length) {
              dispatch(UdateUserList(data));
            }
        } catch (error: any) {
            console.log('error.response.data', error.response.data);
            Alert.alert("", error.response.data.errors[0].message)
            dispatch(SetIsLoadingState(false));
        }
    }

    const GetAuthorListServiceHandler = async() => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await GetAuthorListServices();
            dispatch(SetIsLoadingState(false)); 
            const {data} = res.data;
            if(data.length){
                dispatch(UpdateAuthorList(data));
            }
        } catch (error: any) {
            console.log('error.response.data', error.response.data);
            Alert.alert("", error.response.data.errors[0].message)
            dispatch(SetIsLoadingState(false));
        }
    }

    return {
        GetUserListServiceHandler,
        GetAuthorListServiceHandler
    }
}

export default useAdminServiceHandlers;