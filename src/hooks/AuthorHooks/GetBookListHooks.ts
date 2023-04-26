import { useDispatch } from "react-redux";
import { AuthorBookListService } from "../../services/author/BooksServices";
import { UpdateAuthorBookList } from "../../redux/reducers/authorReducer";
import { Alert } from "react-native";

const useGetBookList = () => {
    const dispatch = useDispatch();

    const GetAuthorBookListServiceHandler = async () => {
        try {
           const res = await AuthorBookListService();
           const data = res.data.data;
           if(data.length){
             dispatch(UpdateAuthorBookList(data));
           }else {
             dispatch(UpdateAuthorBookList([]));
           }
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors[0].message)
        }
    };
    return GetAuthorBookListServiceHandler;
};

export default useGetBookList;