import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';
import {colorSecondary, white} from '../../../assests/Styles/GlobalTheme';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';

const path = '../../../assests/images/profile.jpg';

const bookList = [
  {
    img: 'https://d3bxjxywei423j.cloudfront.net/public/book_picture/size180x280_In%20Search%20of%20Love%20-%20Robin%20S%20Sharma.jpg',
  },
  {
    img: 'https://d3bxjxywei423j.cloudfront.net/public/book_picture/size180x280_Discover%20Your%20Destiny%20With%20The%20Monk%20Who%20Sold%20His%20Ferrari%20-%20Robin%20S%20Sharma.jpg',
  },
  {
    img: 'https://d3bxjxywei423j.cloudfront.net/public/book_picture/size180x280_The%20Everyday%20Hero%20Manifesto%20-%20Robin%20S%20Sharma.jpg',
  },
  {
    img: 'https://d3bxjxywei423j.cloudfront.net/public/book_picture/size180x280_The%20Mastery%20Manual%20-%20Robin%20S%20Sharma.jpg',
  },
];

const AuthorProfile: React.FC<any> = ({route}) => {
  const {author, type} = route.params;
  console.log('type', type);
  
  return (
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

          </View>
        </View>
        <View style={styles.authorBookListContainer}>
          <Text style={styles.authorsDescHeading}>{type === 'AUTHOR' ? 'Book List' : 'Watchlist'}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={styles.authorDescriptionContainer}>
            {bookList.map(book => {
              return (
                <TouchableOpacity key={book.img}>
                  <Image
                    source={{uri: book.img}}
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
    paddingTop: responsiveHeight(2)
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
    backgroundColor: "rgba(80, 200, 120, 0.1)",
    borderTopLeftRadius: responsiveScreenHeight(4),
    borderTopRightRadius: responsiveScreenHeight(4)
  },
  authorDescriptionContainer: {
    flex: 1,
    marginTop: responsiveScreenHeight(2),
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    color: colorSecondary
  },
  bookImg: {
    width: responsiveScreenWidth(28),
    height: responsiveScreenHeight(20),
    borderRadius: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2),
  },
});
