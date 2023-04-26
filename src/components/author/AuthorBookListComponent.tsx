import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { book } from '../../interfaces/author/book.interface';

interface ItemProps {
    book: book
};

const RenderItem:React.FC<ItemProps> = ({book}) => {
    return (
        <View>
           <Text>{book.bookName}</Text>
        </View>
    )
}
const AuthorBookListComponent = () => {
  const {bookList} = useSelector((state: any) => state.author);
  return (
    <FlatList
       data={bookList}
       renderItem={(item: book) => <RenderItem book={item} />}
    />
  )
}

export default AuthorBookListComponent

const styles = StyleSheet.create({})