import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetBookList from '../../../hooks/AuthorHooks/GetBookListHooks';
import { white } from '../../../../assests/Styles/GlobalTheme';
import AuthorBookListComponent from '../../../components/author/AuthorBookListComponent';
import AddNewBookComponent from '../../../components/author/AddNewBookComponent';
import { UpdateShowEditorOptions } from '../../../redux/reducers/commonReducer';

const MyBooks = () => {
  const dispatch = useDispatch();
  const {bookList} = useSelector((state: any) => state.author);
  const GetAuthorBookListServiceHandler = useGetBookList();

  useEffect(() => {
     GetAuthorBookListServiceHandler();
  }, []);
  
  return (
    <View style={styles.container}>
        {
          bookList?.length ? <AuthorBookListComponent /> : <AddNewBookComponent />
        }
    </View>
  )
}

export default MyBooks

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: white
  }
})