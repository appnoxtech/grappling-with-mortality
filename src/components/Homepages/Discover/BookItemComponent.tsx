import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {book} from '../../../interfaces/author/book.interface';
import {colorPrimary, white} from '../../../../assests/Styles/GlobalTheme';
import {UpdateSelectedBook} from '../../../redux/reducers/authorReducer';
import LoadIcon from '../../common/LoadIcons';

interface props {
  book: book;
}

const BookItemComponent: React.FC<props> = ({book}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBookRead = () => {
    dispatch(UpdateSelectedBook(book));
    navigation.navigate('BookDetails' as never);
  };

  return (
    <View key={book._id} style={styles.container}>
      <View style={styles.ImgContainer}>
        <Image
          resizeMode={'cover'}
          style={styles.bookImage}
          source={{uri: book.bookImage}}
          alt="CoverPage"
        />
      </View>
      <View style={styles.aboutBookContainer}>
        <View style={styles.bookDescription}>
          <Text style={styles.bookName}>{book.bookName}</Text>
          <Text style={styles.authorName}>{book.authorName}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleBookRead} style={styles.btn}>
            <LoadIcon iconFamily='FontAwesome5' iconName='book-open' size={18} style={{}} color='white' />
            <Text style={styles.btnText}>Read</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookItemComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    borderRadius: 8,
    height: responsiveScreenHeight(25),
    width: '100%',
    flexDirection: 'row',
    gap: responsiveScreenWidth(5),
  },
  ImgContainer: {
    width: '40%',
    borderRadius: 8,
  },
  bookImage: {
    flex: 1,
    borderRadius: 8,
  },
  bookDescription: {
    flex: 1,
    paddingTop: responsiveScreenHeight(0.5)
  },
  bookName: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '500',
    opacity: 0.9,
    marginBottom: responsiveScreenHeight(0.6),
    textTransform: 'capitalize'
  },
  authorName: {
    fontSize: responsiveFontSize(1.9),
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '500',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal:responsiveScreenWidth(3)
  },
  btn: {
    width: '60%',
    borderRadius: responsiveScreenHeight(5),
    backgroundColor: colorPrimary,
    paddingVertical: responsiveScreenHeight(1.4),
    paddingHorizontal: responsiveScreenWidth(3),
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.3),
    color: white,
    fontWeight: '600',
  },
  aboutBookContainer: {
   flex: 1,
   paddingVertical: responsiveScreenHeight(1)
  }
});
