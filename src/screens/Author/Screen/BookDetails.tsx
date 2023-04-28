import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colorGrey, white} from '../../../../assests/Styles/GlobalTheme';
import BookDetailsHeaderComponent from '../../../components/author/BookDetailsHeader';
import {useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const BookDetails = () => {
  const {selectedBook} = useSelector((state: any) => state.author);
  const [selectedNavItem, setSelectedNavItem] = useState('About');

  return (
    <View style={styles.container}>
      <BookDetailsHeaderComponent />
      <View style={styles.body}>
        <View style={styles.bookSection}>
          <Image
            style={styles.image}
            source={{uri: selectedBook.bookImage}}
            alt="book"
          />
          <Text style={styles.bookName}>{selectedBook.bookName}</Text>
          <Text style={styles.authorName}>{selectedBook.authorName}</Text>
        </View>
        <View style={styles.navigation}>
          <View
            style={
              selectedNavItem === 'About'
                ? styles.selectedNavItem
                : styles.navItem
            }>
            <Text style={styles.navText}>About</Text>
          </View>
          <View
            style={
              selectedNavItem === 'Chapters'
                ? styles.selectedNavItem
                : styles.navItem
            }>
            <Text>Chapters</Text>
          </View>
          <View
            style={
              selectedNavItem === 'Reviews'
                ? styles.selectedNavItem
                : styles.navItem
            }>
            <Text>Reviews</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  body: {
    flex: 1,
    marginTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
    alignItems: 'center'
  },
  bookSection: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  image: {
    width: responsiveScreenHeight(15),
    height: responsiveScreenHeight(19),
    borderRadius: 10,
    marginBottom: responsiveScreenHeight(2),
  },
  bookName: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.7),
    fontWeight: '700',
    color: 'black',
    letterSpacing: 0.4,
  },
  authorName: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.8),
    fontWeight: '500',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: 0.2,
  },
  navigation: {
    marginTop: responsiveScreenHeight(2),
    width: responsiveScreenWidth(90),
    borderWidth: 1.5,
    borderColor: 'rgba(128,128,128,0.5)',
    borderRadius: responsiveFontSize(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
    alignItems: 'center',
    backgroundColor: 'rgba(128,128,128,0.5)',
    padding: responsiveScreenHeight(0.2),
  },
  selectedNavItem: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    paddingVertical: responsiveScreenHeight(1.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: responsiveScreenHeight(1.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: 'black'
  }
});
