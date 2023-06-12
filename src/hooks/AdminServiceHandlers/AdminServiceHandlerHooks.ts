import { useDispatch } from "react-redux";
import { GetAuthorListServices, GetPendingVerificationBookListService, GetUserListServices, RepublishBookService, SearchAuthorService, SearchUserService, UpdatePendingBookStatusService } from "../../services/admin/AdminServices";
import { UdateUserList, UpdateAuthorList, UpdatePendingVerificationBookList } from "../../redux/reducers/adminReducer";
import { SetIsLoadingState } from "../../redux/reducers/commonReducer";
import { Alert } from "react-native";
import { ResetSearchResult, UpdateSearchResult } from "../../redux/reducers/search.reducer";
import { pendingBookDataInterface } from "../../interfaces/common/common";
import useGetBookList from "../AuthorHooks/GetBookListHooks";
import { SearchBookService } from "../../services/author/BooksServices";

const useAdminServiceHandlers = () => {
    const dispatch = useDispatch();
    const GetAuthorBookListServiceHandler = useGetBookList();
    
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
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].message)
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
            Alert.alert("", error.response.data.errors[0].msg)
        }
    }

    const SearchAuthorServiceHandler = async(searchString: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await SearchAuthorService(searchString);
            const {data} = res.data;
            dispatch(SetIsLoadingState(false));
            if(data.length) {
                dispatch(UpdateSearchResult(data));
            }else {
               dispatch(ResetSearchResult()); 
            }
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].msg)
        }
    }

    const GetPendingVerificationBookListServiceHandler = async() => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await GetPendingVerificationBookListService();
            const {data} = res.data;
            dispatch(SetIsLoadingState(false));            
            if(data.length) {
                dispatch(UpdatePendingVerificationBookList(data));
            }else {
               dispatch(UpdatePendingVerificationBookList([])); 
            }
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].msg)
        }
    }

    const UpdatePendingBookStatusServiceHandler = async(data: pendingBookDataInterface) => {
        try {
            dispatch(SetIsLoadingState(true));
            await UpdatePendingBookStatusService(data);
            await GetPendingVerificationBookListServiceHandler();
            dispatch(SetIsLoadingState(false));
        } catch (error: any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].msg)
        }
    }

    const RepublishBookServiceHandler = async(bookId: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            await RepublishBookService(bookId);
            await GetAuthorBookListServiceHandler();
            dispatch(SetIsLoadingState(false));
            Alert.alert('Congratulations', 'Book Sent For Approval !');
        } catch (error: any) {
            dispatch(SetIsLoadingState(false)); 
            Alert.alert("", error.response.data.errors[0].msg)
        }
    }

    const SearchBookServiceHandler = async(bookName: string) => {
        try {
            dispatch(SetIsLoadingState(true));
            const res = await SearchBookService(bookName);
            dispatch(SetIsLoadingState(false));
            const {data} = res.data;
            if(data.length){
              dispatch(UpdateSearchResult(data));
            }else {
              dispatch(UpdateSearchResult([]));
            }
        } catch (error:any) {
            dispatch(SetIsLoadingState(false));
            Alert.alert("", error.response.data.errors[0].msg)
        }
    }

    return {
        GetUserListServiceHandler,
        GetAuthorListServiceHandler,
        SearchUserServiceHandler,
        SearchAuthorServiceHandler,
        GetPendingVerificationBookListServiceHandler,
        UpdatePendingBookStatusServiceHandler,
        RepublishBookServiceHandler,
        SearchBookServiceHandler
    }
}

export default useAdminServiceHandlers;