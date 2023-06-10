import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/homepages/Discover/HeaderComponent';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import useGetAllBookListServiceHandler from '../../hooks/CommonHooks/GetAllBookListServiceHandler';
import {useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import BookItemComponent from '../../components/homepages/Discover/BookItemComponent';

const Discover = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const GetAllBookListServiceHandler = useGetAllBookListServiceHandler();
  const {bookList} = useSelector((store: store) => store.common);
  
  useEffect(() => {
    GetAllBookListServiceHandler();
  }, []);

  const RefreshList = async() => {
    setIsRefresh(true);
    await GetAllBookListServiceHandler();
    setIsRefresh(false);
  }

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.bookListContainer}>
        <FlatList
          onRefresh={RefreshList}
          refreshing={isRefresh}
          data={bookList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <BookItemComponent book={item} />}
          style={styles.newScrollContainer}
          contentContainerStyle={styles.newContentContainer}
        />
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
    marginTop: responsiveScreenHeight(3),
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
    paddingHorizontal: responsiveScreenWidth(3),
  },
  newScrollContainer: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3)
  },
  newContentContainer: {
    gap: responsiveScreenWidth(5),
    justifyContent: 'center',
    paddingBottom: responsiveScreenHeight(2)
  }
});
