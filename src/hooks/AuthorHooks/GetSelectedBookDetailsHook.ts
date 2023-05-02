import { useDispatch } from "react-redux";
import { GetBookDetailsByIdService } from "../../services/author/BooksServices"
import { UpdateSelectedBookDetails } from "../../redux/reducers/authorReducer";
import { Alert } from "react-native";

const useGetSelectedBookDetails = () => {
    const dispatch = useDispatch();
    const GetSelectedBookDetailsServiceHandler = async(bookId: string) => {
        try {
            const res = await GetBookDetailsByIdService(bookId);
            const {data} = res.data;
            dispatch(UpdateSelectedBookDetails(data));
        } catch (error: any) {
            console.log('error.response.data', error.response.data);
            
            Alert.alert('Error', error.response.data);
        }
    }
    return GetSelectedBookDetailsServiceHandler;
}

export default useGetSelectedBookDetails;