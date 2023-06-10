import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colorSecondary, white} from '../../../assests/Styles/GlobalTheme';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import useGetBookList from '../../hooks/AuthorHooks/GetBookListHooks';
import useUserServiceHandler from '../../hooks/User/UserServiceHandler';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import {book} from '../../interfaces/author/book.interface';
import LoadIcon from '../../components/common/LoadIcons';
import {
  UpdateAuthorBookList,
  UpdateSelectedBook,
} from '../../redux/reducers/authorReducer';
import LoadingScreen from './LoadingScreen';

const AuthorProfile: React.FC<any> = ({route}) => {
  const {author, type} = route.params;
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const GetAuthorBookListServiceHandler = useGetBookList();
  const {GetUserBookHistoryServiceHandler} = useUserServiceHandler();
  const {bookHistories} = useSelector((store: store) => store.user);
  const {bookList} = useSelector((state: any) => state.author);
  const path = '../../../assests/images/profile.jpg';

  useEffect(() => {
    if (type === 'AUTHOR') {
      GetAuthorBookListServiceHandler();
    } else {
      GetUserBookHistoryServiceHandler(author._id);
    }
    return () => {
      dispatch(UpdateAuthorBookList([]));
    };
  }, []);

  const dataList = type === 'AUTHOR' ? bookList : bookHistories;

  const handelBookItemPress = (book: book) => {
    dispatch(UpdateSelectedBook(book));
    Navigation.navigate('BookDetails' as never);
  };

  return (
    <LoadingScreen>
      <View style={styles.container}>
        <HeaderWithBackBtn />
        <View style={styles.body}>
          <View style={styles.header}>
            {author.image ? (
              <Image
                resizeMode="cover"
                source={{uri: author.image}}
                alt="author"
                style={styles.img}
              />
            ) : (
              <Image
                resizeMode="cover"
                source={require(path)}
                alt="author"
                style={styles.img}
              />
            )}
            <View style={styles.aboutAuthor}>
              <Text style={styles.authorName}>{author.fullName}</Text>
              <View style={styles.card}>
                <LoadIcon
                  iconFamily="FontAwesome5"
                  iconName="user-alt"
                  size={15}
                  color="black"
                  style={{}}
                />
                <Text style={styles.cardText}>
                  {type === 'AUTHOR' ? 'Author' : 'User'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.authorBookListContainer}>
            <Text style={styles.authorsDescHeading}>
              {type === 'AUTHOR' ? 'Book List' : 'Watchlist'}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              style={styles.authorDescriptionContainer}>
              {dataList?.map((book: book) => {
                return (
                  <TouchableOpacity
                    onPress={() => handelBookItemPress(book)}
                    key={book._id}>
                    <Image
                      source={{uri: book.bookImage}}
                      alt="book"
                      style={styles.bookImg}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </LoadingScreen>
  );
};

export default AuthorProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  body: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(4),
    paddingTop: responsiveScreenHeight(2),
    gap: responsiveScreenWidth(3),
    alignItems: 'flex-start',
  },
  img: {
    width: responsiveHeight(12),
    height: responsiveHeight(15),
    borderRadius: responsiveHeight(2),
  },
  aboutAuthor: {
    paddingTop: responsiveHeight(2),
  },
  authorName: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5,
  },
  authorsDescMainContainer: {
    marginTop: responsiveScreenHeight(2),
    height: responsiveScreenHeight(25),
  },
  authorBookListContainer: {
    marginTop: responsiveScreenHeight(4),
    paddingTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4),
    flex: 1,
    backgroundColor: 'rgba(80, 200, 120, 0.1)',
    borderTopLeftRadius: responsiveScreenHeight(4),
    borderTopRightRadius: responsiveScreenHeight(4),
  },
  authorDescriptionContainer: {
    flex: 1,
    marginTop: responsiveScreenHeight(2),
  },
  contentContainer: {
    flexDirection: 'row',
    gap: responsiveScreenHeight(1.8),
    flexWrap: 'wrap',
  },
  authorDescription: {
    textAlign: 'justify',
    color: 'black',
    opacity: 0.5,
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500',
    letterSpacing: 0.7,
  },
  authorsDescHeading: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
    letterSpacing: 0.7,
    color: colorSecondary,
  },
  bookImg: {
    width: responsiveScreenWidth(28),
    height: responsiveScreenHeight(20),
    borderRadius: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2),
  },
  card: {
    width: responsiveScreenWidth(25),
    borderRadius: responsiveScreenHeight(2),
    paddingVertical: responsiveScreenHeight(1),
    marginTop: responsiveScreenHeight(1),
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
    paddingHorizontal: responsiveScreenWidth(3),
  },
  cardText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    textAlign: 'center',
  },
});
