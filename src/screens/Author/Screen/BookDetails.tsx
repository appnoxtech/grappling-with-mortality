import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorGrey, white} from '../../../../assests/Styles/GlobalTheme';
import BookDetailsHeaderComponent from '../../../components/author/BookDetails/BookDetailsHeader';
import {useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import BookDetailsNavigation from '../../../components/author/BookDetails/BookDetailsNavigation';
import useGetSelectedBookDetails from '../../../hooks/AuthorHooks/GetSelectedBookDetailsHook';

const BookDetails = () => {
  const GetSelectedBookDetailsServiceHandler = useGetSelectedBookDetails();
  const {selectedBook} = useSelector((state: any) => state.author);
  
  useEffect(() => {
    GetSelectedBookDetailsServiceHandler(selectedBook._id);
  }, []);
  
  return (
    <View style={styles.container}>
      <BookDetailsHeaderComponent />
      <View style={styles.body}>
        <View style={styles.bookSection}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: selectedBook.bookImage}}
              alt="book"
            />
          </View>
          <Text style={styles.bookName}>{selectedBook.bookName}</Text>
          <Text style={styles.authorName}>{selectedBook.authorName}</Text>
        </View>
        <BookDetailsNavigation />
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
  imageContainer:{
    width: responsiveScreenHeight(15),
    height: responsiveScreenHeight(20),
    borderRadius: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: responsiveScreenHeight(1),
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
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500',
    color: 'rgba(0,0,0,0.3)',
    letterSpacing: 0.2,
  },

});
