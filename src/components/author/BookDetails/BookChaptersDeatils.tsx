import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import ChaptersListComponent from './ChaptersListComponent';
import AddChaptersComponent from './AddChaptersComponent';

const BookChaptersDeatils = () => {
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  console.log('selectedBookDetails', selectedBookDetails);

  return (
    <View style={styles.container}>
      {selectedBookDetails.chapters.length ? (
        <ChaptersListComponent />
      ) : (
        <AddChaptersComponent />
      )}
    </View>
  );
};

export default BookChaptersDeatils;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
