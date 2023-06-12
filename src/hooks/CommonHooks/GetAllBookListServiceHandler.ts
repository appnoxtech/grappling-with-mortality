import { Alert } from "react-native";
import { AuthorBookListService, GetBookListService } from "../../services/author/BooksServices";
import { useDispatch } from "react-redux";
import { UpdateGetAllBookList } from "../../redux/reducers/commonReducer";

const useGetAllBookListServiceHandler = () => {
   const dispatch = useDispatch();
   const GetAllBookListServiceHandler = async () => {
    try {
        const res = await GetBookListService();
        const {data} = res.data;
        if(data?.length){
            dispatch(UpdateGetAllBookList(data));
        }
      } catch (error: any) {
        console.log('Error', error.response.data.errors[0].msg);
         Alert.alert('Notification', 'Something went wrong try again later !')
      }
   }

   return GetAllBookListServiceHandler;
}

export default useGetAllBookListServiceHandler;