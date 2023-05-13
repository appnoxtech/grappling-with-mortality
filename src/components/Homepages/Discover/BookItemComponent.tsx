import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import { book } from '../../../interfaces/author/book.interface'
import { colorPrimary, white } from '../../../../assests/Styles/GlobalTheme'
import { UpdateSelectedBook } from '../../../redux/reducers/authorReducer'

interface props {
    book: book
}

const BookItemComponent: React.FC<props> = ({book}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBookRead = () => {
    dispatch(UpdateSelectedBook(book));
    navigation.navigate('BookDetails' as never);
  };

  return (
    <View style={styles.container}>
       <View style={styles.ImgContainer}>
       <Image style={styles.bookImage} source={{uri: book.bookImage}} alt='CoverPage' />
       </View>
       <View style={styles.bookDescription}>
           <Text style={styles.bookName}>{book.bookName}</Text>
           <Text style={styles.authorName}>{book.authorName}</Text>
       </View>
       <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleBookRead} style={styles.btn}>
             <Text style={styles.btnText}>Read</Text>
          </TouchableOpacity>
       </View>
    </View>
  )
}

export default BookItemComponent

const styles = StyleSheet.create({
    container: {
      backgroundColor: white,
      borderRadius: 5,
      height: responsiveScreenHeight(50),
      width: responsiveScreenWidth(80),
      position: 'relative',
      marginTop: responsiveScreenHeight(10)
    },
    ImgContainer: {
        position: 'absolute',
        width: responsiveScreenWidth(55),
        height: responsiveScreenHeight(35),
        top: responsiveScreenHeight(-10),
        left: responsiveScreenWidth(12.5),
        borderRadius: 5,
    },
    bookImage: {
        flex: 1,
    },
    bookDescription: {
       marginTop: responsiveScreenHeight(28),
       justifyContent: 'center',
       alignItems: 'center',
    },
    bookName: {
       fontSize: responsiveFontSize(2),
       color: 'black',
       fontWeight: '500'
    },
    authorName: {
        fontSize: responsiveFontSize(1.5),
        color: 'rgba(0,0,0,0.5)',
        fontWeight: '500'
    },
    actionsContainer: {
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: responsiveScreenHeight(5)
    },
    btn: {
       width: '80%',
       borderRadius: 10,
       backgroundColor: colorPrimary,
       paddingVertical: responsiveScreenHeight(2),
    },
    btnText: {
       textAlign: 'center',
       fontSize: responsiveFontSize(2),
       color: white,
       fontWeight: '600'
    }
})