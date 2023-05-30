import {useDispatch} from 'react-redux';
import {AuthorBookListService} from '../../services/author/BooksServices';
import {UpdateAuthorBookList} from '../../redux/reducers/authorReducer';
import {Alert} from 'react-native';
import {SetIsLoadingState} from '../../redux/reducers/commonReducer';

const useGetBookList = () => {
  const dispatch = useDispatch();

  const GetAuthorBookListServiceHandler = async () => {
    try {
      dispatch(SetIsLoadingState(true));
      const res = await AuthorBookListService();
      const data = res.data.data;
      if (data.length) {
        dispatch(UpdateAuthorBookList(data));
      } else {
        dispatch(UpdateAuthorBookList([]));
      }
      dispatch(SetIsLoadingState(false));
    } catch (error: any) {
      dispatch(SetIsLoadingState(false));
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };
  return GetAuthorBookListServiceHandler;
};

export default useGetBookList;
