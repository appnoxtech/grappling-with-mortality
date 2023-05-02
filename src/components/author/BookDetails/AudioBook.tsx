import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import AudioChaptersListComponent from './AudioChaptersListComponent';
import AddAudioChapterComponent from './AddAudioChapterComponent';

const AudioBook = () => {
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  return (
    <View style={styles.container}>
      {selectedBookDetails?.audio?.length ? (
        <AudioChaptersListComponent />
      ) : (
        <AddAudioChapterComponent />
      )}
    </View>
  );
};

export default AudioBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
