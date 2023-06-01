import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {white} from '../../../assests/Styles/GlobalTheme';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';

const img =
  'https://harsha-temp.s3.ap-south-1.amazonaws.com/appnox/Grappling_With_Mortality/95BB7359_ADAE_46A9_9203_FD13DE46C97B_1683007757316.jpg';
const name = 'Robin Sharma';
const authorDescription = `Robin Sharma is a globally respected humanitarian who, for over a quarter of a century, has been devoted to helping human beings realize their native gifts.
Widely considered one of the top leadership and personal mastery experts and speakers in the world, his clients include NASA, Microsoft, Nike, Unilever, General Electric, FedEx, HP, Starbucks, Oracle, Yale University, PwC, IBM Watson, and the Young Presidents' Organization. As a presenter, Robin Sharma possesses the rare ability to electrify an audience while delivering uncommonly original and tactical insights that lead to individuals doing their best work, teams providing superb results and organizations becoming unbeatable.
His #1 international bestsellers such as The Everyday Hero Manifesto, The 5AM Club, The Monk Who Sold His Ferrari, and Who Will Cry When You Die? have sold millions of copies in over ninety-two languages and dialects; making him one of the most widely read authors in the world.`;

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
  const {author} = route.params;
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

          <Text style={styles.authorName}>{author.fullName}</Text>
        </View>
        <View style={styles.authorsDescMainContainer}>
          <Text style={styles.authorsDescHeading}>About Author</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={styles.authorDescriptionContainer}>
            <Text style={styles.authorDescription}>{authorDescription}</Text>
          </ScrollView>
        </View>
        <View style={styles.authorBookListContainer}>
          <Text style={styles.authorsDescHeading}>Author's Other Books</Text>
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
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
  },
  header: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(3),
    alignItems: 'center',
  },
  img: {
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    borderRadius: responsiveHeight(5),
  },
  authorName: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5,
  },
  authorsDescMainContainer: {
    marginTop: responsiveScreenHeight(2),
    height: responsiveScreenHeight(25),
  },
  authorBookListContainer: {
    marginTop: responsiveScreenHeight(2),
    flex: 1,
  },
  authorDescriptionContainer: {
    flex: 1,
    marginTop: responsiveScreenHeight(0.5),
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
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bookImg: {
    width: responsiveScreenWidth(28),
    height: responsiveScreenHeight(20),
    borderRadius: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2),
  },
});
