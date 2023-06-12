import { useDispatch } from "react-redux";
import { GetBookDetailsByIdService } from "../../services/author/BooksServices"
import { UpdateSelectedBookDetails } from "../../redux/reducers/authorReducer";
import { Alert } from "react-native";
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";

const useGetSelectedBookDetails = () => {
    const dispatch = useDispatch();
    const GetSelectedBookDetailsServiceHandler = async(bookId: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await GetBookDetailsByIdService(bookId);
            const {data} = res.data;
            console.log('data===>', data);
            
            dispatch(UpdateSelectedBookDetails(data));
            dispatch(SetIsLoadingState(false));
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert('Error', error.response.errors[0].msg)
        }
    }
    return GetSelectedBookDetailsServiceHandler;
}

export default useGetSelectedBookDetails;