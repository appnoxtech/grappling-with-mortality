import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {colorPrimary, white} from '../../../assests/Styles/GlobalTheme';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import {TouchableOpacity} from 'react-native';
import useAdminServiceHandlers from '../../hooks/AdminServiceHandlers/AdminServiceHandlerHooks';
import {pendingBookDataInterface} from '../../interfaces/common/common';
import {UpdateSelectedBook} from '../../redux/reducers/authorReducer';
import {book} from '../../interfaces/author/book.interface';

const title = {
  main: 'Verification Request',
};

const path = '../../../assests/animations/EmptyBox.json';

interface props {
  setShowDialog(state: boolean): any, 
}

const PendingVerificationBookListComponent:React.FC<props> = ({setShowDialog}) => {
  const Navigation = useNavigation();
  const {UpdatePendingBookStatusServiceHandler} = useAdminServiceHandlers();
  const dispatch = useDispatch();

  const {pendingVerificationBookList} = useSelector(
    (store: store) => store.admin,
  );

  const handleAcceptBtnClick = (data: pendingBookDataInterface) => {
    UpdatePendingBookStatusServiceHandler(data);
  };

  const handelViewDetailsBtnClick = (book: book) => {
    dispatch(UpdateSelectedBook(book));
    Navigation.navigate('BookDetails' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title.main}</Text>
      <View style={styles.bookListContainer}>
        {pendingVerificationBookList?.length ? (
          pendingVerificationBookList.map(item => {
            return (
              <View key={item._id} style={styles.bookContainer}>
                <Image
                  resizeMode="contain"
                  source={{uri: item.bookImage}}
                  alt="book"
                  style={styles.bookImg}
                />
                <View style={{flex: 1}}>
                  <Text style={styles.bookName}>{item.bookName}</Text>
                  <Text style={styles.authorName}>{item.authorName}</Text>
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (item._id) {
                          handleAcceptBtnClick({
                            bookId: item._id,
                            publishStatus: 'PUBLISHED',
                          });
                        }
                      }}
                      style={[styles.actionBtn, {backgroundColor: 'green'}]}>
                      <Text style={styles.actionBtnText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, {backgroundColor: 'red'}]}
                      onPress={() => {
                        dispatch(UpdateSelectedBook(item))
                        setShowDialog(true);
                      }}>
                      <Text style={styles.actionBtnText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => handelViewDetailsBtnClick(item)}
                    style={[styles.actionBtn, {backgroundColor: colorPrimary}]}>
                    <Text style={styles.btnText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.animationContainer}>
            <Lottie
              resizeMode="cover"
              style={styles.animationStyle}
              source={require(path)}
              autoPlay
              loop
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default PendingVerificationBookListComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
    borderRadius: responsiveScreenHeight(2),
    marginTop: responsiveScreenHeight(2),
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  bookContainer: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    minHeight: responsiveScreenHeight(22),
    marginBottom: responsiveScreenHeight(2),
  },
  bookImg: {
    height: responsiveScreenHeight(22),
    width: responsiveScreenWidth(30),
    borderRadius: responsiveScreenWidth(2.5),
  },
  bookListContainer: {
    marginTop: responsiveScreenHeight(2),
  },
  bookName: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: 'bold',
    color: 'black',
  },
  authorName: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    opacity: 0.5,
    marginTop: responsiveScreenHeight(0.5),
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(3),
    marginBottom: responsiveScreenHeight(1),
  },
  actionBtn: {
    flex: 1,
    paddingVertical: responsiveScreenHeight(1.5),
    borderRadius: responsiveScreenHeight(1),
  },
  actionBtnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
  },
  animationContainer: {
    minHeight: responsiveScreenHeight(22),
    marginBottom: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  animationStyle: {
     width: responsiveScreenWidth(60),
     height: responsiveScreenHeight(20)
  }
});
