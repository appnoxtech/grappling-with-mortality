import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../interfaces/reducer/state';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorPrimary } from '../../../assests/Styles/GlobalTheme';

const PendingVerificationBookItem = () => {
    const {pendingVerificationBookList} = useSelector(
        (store: store) => store.admin,
      );
  return (
    <>
      {pendingVerificationBookList.map(item => {
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
                  style={[styles.actionBtn, {backgroundColor: 'green'}]}>
                  <Text style={styles.actionBtnText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, {backgroundColor: 'red'}]}>
                  <Text style={styles.actionBtnText}>Reject</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.btn, {backgroundColor: colorPrimary}]}>
                <Text style={styles.btnText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default PendingVerificationBookItem;

const styles = StyleSheet.create({
    bookContainer: {
        flexDirection: 'row',
        gap: responsiveScreenWidth(2),
        minHeight: responsiveScreenHeight(22),
        marginBottom: responsiveScreenHeight(2)
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
        width: '100%',
        paddingVertical: responsiveScreenHeight(1.5),
        borderRadius: responsiveScreenHeight(1),
      },
      actionBtnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
      },
      btn: {
        paddingVertical: responsiveScreenHeight(1.5),
        borderRadius: responsiveScreenHeight(1),
      },
      btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: responsiveFontSize(2.5),
        fontWeight: '600',
      }
});
