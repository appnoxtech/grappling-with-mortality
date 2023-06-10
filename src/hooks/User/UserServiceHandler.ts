import { useDispatch } from "react-redux";
import { GetUserBookHistoryService } from "../../services/user/BookHistoriesServices"
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";
import { UpdateUserBookHistory } from "../../redux/reducers/userReducer";
import { Alert } from "react-native";

const useUserServiceHandler = () => {
    const dispatch = useDispatch();

    const GetUserBookHistoryServiceHandler = async(userId: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await GetUserBookHistoryService(userId);
            const {data} = res.data;
            console.log('Data', data);
            dispatch(SetIsLoadingState(false));
            if(data.length){
               dispatch(UpdateUserBookHistory(data))
            }else {
               dispatch(UpdateUserBookHistory([]))
            }
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].msg)
        }
    }

    return {
        GetUserBookHistoryServiceHandler,
    }
};

export default useUserServiceHandler;