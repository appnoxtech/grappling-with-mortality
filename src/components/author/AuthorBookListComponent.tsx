import {FlatList, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  colorPrimary,
  colorSecondary,
  white,
} from '../../../assests/Styles/GlobalTheme';
import {book} from '../../interfaces/author/book.interface';

import CommonHeader from '../common/headers/CommonHeader';
import LoadIcon from '../common/LoadIcons';
import {
  ClearNewBookDetails,
  UpdateSelectedBook,
} from '../../redux/reducers/authorReducer';
import useGetBookList from '../../hooks/AuthorHooks/GetBookListHooks';

interface ItemProps {
  book: book;
}

const constant = {
  iconFamily: 'FontAwesome5',
  iconName: 'plus',
  size: 30,
};

const RenderItem: React.FC<ItemProps> = ({book}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleBookItemClick = () => {
    dispatch(UpdateSelectedBook(book));
    navigation.navigate('BookDetails' as never);
  };

  return (
    <TouchableOpacity
      onPress={handleBookItemClick}
      style={styles.bookItemContainer}>
      <View style={styles.bookImageContainer}>
        <Image
          style={styles.bookImage}
          source={{uri: book.bookImage}}
          alt="book"
        />
      </View>
      <View style={styles.bookInfoContainer}>
        <View style={styles.bookDetails}>
          <Text style={styles.bookName}>{book.bookName}</Text>
          <Text style={styles.authorName}>{book.authorName}</Text>
        </View>
        <View
          style={[
            styles.bookStatus,
            {
              backgroundColor: white,
            },
          ]}>
          <Text
            style={[
              styles.bookStatusText,
              {
                color:
                  book.publishStatus === 'PENDING'
                    ? '#F29339'
                    : book.publishStatus === 'REJECTED'
                    ? 'rgba(255, 76, 20, 1)'
                    :  book.publishStatus === 'ISBN-PENDING'
                    ?  colorPrimary
                    : "rgba(80, 200, 120, 0.8)",
              },
            ]}>
            {book.publishStatus}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const AuthorBookListComponent = () => {
  const navigation = useNavigation();
  const [isRefresh, setIsRefresh] = useState(false);
  const GetAuthorBookListServiceHandler = useGetBookList();

  const dispatch = useDispatch();
  const {bookList} = useSelector((state: any) => state.author);
  const handlePress = () => {
    dispatch(ClearNewBookDetails());
    navigation.navigate('AddNewBook' as never);
  };

  const RefreshList = async() => {
    setIsRefresh(true);
    await GetAuthorBookListServiceHandler();
    setIsRefresh(false);
  }

  return (
    <View style={styles.container}>
      <CommonHeader paddingTop={Platform.OS === 'android' ? 3 : 5}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your Books</Text>
        </View>
      </CommonHeader>
      <FlatList
        onRefresh={RefreshList}
        refreshing={isRefresh}
        contentContainerStyle={styles.contentContainer}
        style={styles.listContainer}
        data={bookList}
        renderItem={(item: any) => <RenderItem book={item.item} />}
      />
      <TouchableOpacity onPress={handlePress} style={styles.btnContainer}>
        <LoadIcon
          iconFamily={constant.iconFamily}
          iconName={constant.iconName}
          color={white}
          style={{}}
          size={constant.size}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AuthorBookListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    position: 'relative',
  },
  contentContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(2),
    gap: responsiveScreenHeight(3),
  },
  listContainer: {
    flex: 1,
  },
  textContainer: {
    width: '100%',
    paddingVertical: responsiveScreenHeight(2),
  },
  text: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  bookItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  bookImageContainer: {
    width: responsiveScreenWidth(24),
    height: responsiveScreenHeight(17),
  },
  bookInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(65),
    height: responsiveScreenHeight(11),
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.5)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(2),
  },
  bookName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: 'black',
  },
  authorName: {
    fontSize: responsiveFontSize(1.5),
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: 0.3,
  },
  btnContainer: {
    width: responsiveScreenWidth(15),
    height: responsiveScreenWidth(15),
    borderRadius: responsiveScreenWidth(9),
    backgroundColor: colorSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  bookStatus: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(5),
    borderRadius: responsiveScreenHeight(2),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bookStatusText: {
    textAlign: 'center',
    color: white,
    fontWeight: '700',
    fontSize: responsiveFontSize(1.5),
  },
  bookDetails: {
    width: '50%',
  },
});
