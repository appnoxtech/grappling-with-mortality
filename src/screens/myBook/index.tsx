import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetBookList from '../../hooks/AuthorHooks/GetBookListHooks';
import LoadingScreen from '../common/LoadingScreen';
import AuthorBookListComponent from '../../components/author/AuthorBookListComponent';
import AddNewBookComponent from '../../components/author/AddNewBookComponent';
import { white } from '../../../assests/Styles/GlobalTheme';

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