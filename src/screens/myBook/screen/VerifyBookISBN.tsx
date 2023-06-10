import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colorPrimary, white} from '../../../../assests/Styles/GlobalTheme';
import HeaderWithTitle from '../../../components/common/headers/HeaderWithTitle';
import {TextInput} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/core';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';
//@ts-ignore
import isbn from 'isbnjs';
import useAuthorServicesHandler from '../../../hooks/AuthorHooks/AuthorServiceHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { EditNewBook } from '../../../redux/reducers/authorReducer';

const VerifyBookISBN = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {selectedBook} = useSelector((state: any) => state.author);
  const {VerifyBookISBNServiceHandler, PublishBookServiceHandler}  = useAuthorServicesHandler();
  const [ISBN, setISBN] = useState('');
  const [errorMsg, SetErrorMsg] = useState('');
  const [status, setStatus] = useState('');

  const VerifyIsbn = async () => {
    const ISBNData = isbn.parse(ISBN);
    if (ISBNData) {
      const data = {bookId: selectedBook._id, ISBN}
      const message = await VerifyBookISBNServiceHandler(data);
      setStatus(message);
    } else {
      SetErrorMsg('Invalid ISBN Number !');
    }
  };

  const handelBookPublish = async () => {
    PublishBookServiceHandler(selectedBook._id);
  };

  const handelBookEdit = () => {
    dispatch(EditNewBook());
    Navigation.navigate('AddNewBook' as never);
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title="ISBN Verification" />
      <View style={styles.body}>
        <View style={styles.isbnContainer}>
          <TextInput
            placeholder="Enter ISBN Number ..."
            value={ISBN}
            onChangeText={text => setISBN(text)}
            style={[
              styles.textInput,
              {borderColor: errorMsg ? 'red' : colorPrimary},
            ]}
          />
          {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
        </View>
        <View style={styles.btnMainContainer}>
          <View style={styles.btnContainer}>
            <ButtonPrimary label="Verify ISBN" handleBtnPress={VerifyIsbn} />
          </View>
        </View>
      </View>
      <View style={styles.actionContainer}>
        {status === 'VERIFIED' ? (
          <View style={styles.btnMainContainer}>
            <View style={styles.actionBtnContainer}>
              <ButtonPrimary
                label="Publish Book"
                handleBtnPress={handelBookPublish}
              />
            </View>
          </View>
        ) : status === 'NOT MATCHED' ? (
          <View style={styles.btnMainContainer}>
            <View style={styles.actionBtnContainer}>
              <ButtonPrimary
                label="Edit Book"
                handleBtnPress={handelBookEdit}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default VerifyBookISBN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  body: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3),
  },
  textInput: {
    paddingHorizontal: responsiveScreenWidth(3),
    borderRadius: responsiveScreenHeight(1),
    borderColor: colorPrimary,
    borderWidth: 1.5,
    fontSize: responsiveFontSize(2),
    paddingVertical: responsiveScreenHeight(2),
  },
  isbnContainer: {
    marginTop: responsiveScreenHeight(5),
    marginBottom: responsiveScreenHeight(3),
  },
  btnContainer: {
    width: '50%',
  },
  btnMainContainer: {
    alignItems: 'center',
  },
  errorMsg: {
    fontSize: responsiveFontSize(1.8),
    color: 'red',
    textAlign: 'right',
    marginTop: responsiveScreenHeight(0.5),
  },
  actionContainer: {
    marginVertical: responsiveScreenHeight(3),
  },
  actionBtnContainer: {
    width: '85%'
  }
});
