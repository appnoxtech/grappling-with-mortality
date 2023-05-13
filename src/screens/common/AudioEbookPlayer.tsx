import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { white } from '../../../assests/Styles/GlobalTheme'
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn'
import { useSelector } from 'react-redux'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import EbookPlayerComponent from '../../components/common/screens/common/EbookPlayerComponent'
import { store } from '../../interfaces/reducer/state'

const AudioEbookPlayer = () => {
  const {selectedBook} = useSelector((state: store) => state.author);
  const {selectedAudioBook} = useSelector((store: store) => store.audio);

  return (
    <View style={styles.container}>
       <HeaderWithBackBtn paddingTop={Platform.OS === 'android' ? 8 : 13} />
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
      </View>
      <EbookPlayerComponent />
    </View>
  )
}

export default AudioEbookPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    body: {
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
        fontSize: responsiveFontSize(2.2),
        fontWeight: '700',
        color: 'black',
        letterSpacing: 0.4,
      },
      authorName: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2.2),
        fontWeight: '500',
        color: 'rgba(0,0,0,0.3)',
        letterSpacing: 0.2,
      },
})