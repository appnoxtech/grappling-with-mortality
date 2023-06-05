import { useDispatch } from "react-redux";
import { GetAuthorListServices, GetUserListServices, SearchAuthorService, SearchUserService } from "../../services/admin/AdminServices";
import { UdateUserList, UpdateAuthorList } from "../../redux/reducers/adminReducer";
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";
import { Alert } from "react-native";
import { ResetSearchResult, UpdateSearchResult } from "../../redux/reducers/search.reducer";

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

    const SearchUserServiceHandler = async(searchString: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await SearchUserService(searchString);
            const {data} = res.data;
            dispatch(SetIsLoadingState(false));
            if(data.length) {
                dispatch(UpdateSearchResult(data));
            }else {
               dispatch(ResetSearchResult()); 
            }
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].message)
        }
    }

    const SearchAuthorServiceHandler = async(searchString: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await SearchAuthorService(searchString);
            const {data} = res.data;
            console.log('DATA', data);
            dispatch(SetIsLoadingState(false));
            if(data.length) {
                dispatch(UpdateSearchResult(data));
            }else {
               dispatch(ResetSearchResult()); 
            }
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].message)
        }
    }

    return {
        GetUserListServiceHandler,
        GetAuthorListServiceHandler,
        SearchUserServiceHandler,
        SearchAuthorServiceHandler
    }
}

export default useAdminServiceHandlers;