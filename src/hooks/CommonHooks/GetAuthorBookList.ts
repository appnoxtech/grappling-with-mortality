import { useDispatch } from "react-redux";
import { GetAuthorBooksListByIdService } from "../../services/common/commonServices";
import { UpdateAuthorBookList } from "../../redux/reducers/authorReducer";
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";
import { Alert } from "react-native";

const useCommonServiceHandler = () => {
   const dispatch = useDispatch();

   const GetAuthorBookListByIdServiceHandler = async(auhtorId: string) => {
      try {
        dispatch(SetIsLoadingState(true));
        const res = await GetAuthorBooksListByIdService(auhtorId);
        const {data} = res.data;
        dispatch(SetIsLoadingState(false));
        if(data.length){
            dispatch(UpdateAuthorBookList(data));
        }
      } catch (error: any) {
        dispatch(SetIsLoadingState(false));
        Alert.alert('', error.response.data.errors[0].msg);
      }
   }

   return {
     GetAuthorBookListByIdServiceHandler
   }
}

export default useCommonServiceHandler;