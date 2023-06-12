import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import {useNavigation} from '@react-navigation/core';
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";
import { PublishBookService, VerifyBookISBNService } from "../../services/author/BooksServices"
import useGetSelectedBookDetails from "./GetSelectedBookDetailsHook";
import useGetBookList from "./GetBookListHooks";

const useAuthorServicesHandler = () => {
    const GetSelectedBookDetailsServiceHandler = useGetSelectedBookDetails();
    const GetAuthorBookListServiceHandler = useGetBookList();
    const dispatch = useDispatch();
    const Navigation = useNavigation();

    const VerifyBookISBNServiceHandler = async (Data: {bookId: string, ISBN: string}) => {
        try {
            dispatch(SetIsLoadingState(true))
            const res = await VerifyBookISBNService(Data);
            await GetSelectedBookDetailsServiceHandler(Data.bookId);
            await GetAuthorBookListServiceHandler();
            dispatch(SetIsLoadingState(false))
            return res.data.msg;
        } catch (error: any) {
            dispatch(SetIsLoadingState(false))
            Alert.alert("", error.response.data.errors[0].message);
            return 'NOT MATCHED';
        }
    }

    const PublishBookServiceHandler = async (bookId: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            await PublishBookService(bookId);
            await GetSelectedBookDetailsServiceHandler(bookId);
            await GetAuthorBookListServiceHandler();
            dispatch(SetIsLoadingState(false));
            Alert.alert('', 'Book Published Successfully.');
            setTimeout(() => {
                Navigation.goBack(); 
            }, 800);
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].message);
        }
    }
    return {VerifyBookISBNServiceHandler, PublishBookServiceHandler};
}

export default useAuthorServicesHandler