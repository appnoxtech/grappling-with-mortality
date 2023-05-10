import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HeaderComponent from '../../components/Homepages/Discover/HeaderComponent';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import useGetAllBookListServiceHandler from '../../hooks/CommonHooks/GetAllBookListServiceHandler';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import BookItemComponent from '../../components/Homepages/Discover/BookItemComponent';
import { UpdateShowEditorOptions } from '../../redux/reducers/commonReducer';

const Discover = () => {
  const dispatch = useDispatch();
  const GetAllBookListServiceHandler = useGetAllBookListServiceHandler();
  const {bookList} = useSelector((store: store) => store.common);

  useEffect(() => {
    GetAllBookListServiceHandler();
    dispatch(UpdateShowEditorOptions(false));
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.bookListContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollContainer}>
          {bookList?.map((book, index) => (
            <React.Fragment key={index}>
              <BookItemComponent book={book} />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookListContainer: {
    flex: 1,
    marginTop: responsiveScreenHeight(3)
  },
  bookList: {
    paddingHorizontal: responsiveScreenWidth(3),
  },
  contentContainer: {
    gap: responsiveScreenWidth(5),
    paddingHorizontal: responsiveScreenWidth(2),
},
scrollContainer: {
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(3)
 },
});
