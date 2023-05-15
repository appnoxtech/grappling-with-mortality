import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetBookList from '../../../hooks/AuthorHooks/GetBookListHooks';
import { white } from '../../../../assests/Styles/GlobalTheme';
import AuthorBookListComponent from '../../../components/author/AuthorBookListComponent';
import AddNewBookComponent from '../../../components/author/AddNewBookComponent';
import { UpdateShowEditorOptions } from '../../../redux/reducers/commonReducer';
import LoadingScreen from '../../common/LoadingScreen';

const MyBooks = () => {
  const dispatch = useDispatch();
  const {bookList} = useSelector((state: any) => state.author);
  const GetAuthorBookListServiceHandler = useGetBookList();

  useEffect(() => {
     GetAuthorBookListServiceHandler();
  }, []);
  
  return (
    <LoadingScreen>
      <View style={styles.container}>
          {
            bookList?.length ? <AuthorBookListComponent /> : <AddNewBookComponent />
          }
      </View>
    </LoadingScreen>

  )
}

export default MyBooks

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: white
  }
})