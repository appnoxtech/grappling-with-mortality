import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {white} from '../../../../assests/Styles/GlobalTheme';
import {useNavigation} from '@react-navigation/core';
import HeaderWithTitle from '../../../components/common/headers/HeaderWithTitle';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import LoadIcon from '../../../components/common/LoadIcons';
import {useDispatch, useSelector} from 'react-redux';
import {EditNewBook} from '../../../redux/reducers/authorReducer';
import {store} from '../../../interfaces/reducer/state';
import useAdminServiceHandlers from '../../../hooks/AdminServiceHandlers/AdminServiceHandlerHooks';
import useAuthorServicesHandler from '../../../hooks/AuthorHooks/AuthorServiceHandlers';

const BookSetting = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {selectedBookDetails} = useSelector((state: store) => state.author);
  const [isOpen, setIsOpen] = useState(false);
  const {RepublishBookServiceHandler} = useAdminServiceHandlers();
  const {PublishBookServiceHandler} = useAuthorServicesHandler();

  const handleBookEdit = () => {
    dispatch(EditNewBook());
    Navigation.navigate('AddNewBook' as never);
  };

  const handelRepublishBtnPress = () => {
    if (selectedBookDetails._id) {
      RepublishBookServiceHandler(selectedBookDetails._id);
    }
  };

  const handleBookPublish = () => {
    if (selectedBookDetails._id)
      PublishBookServiceHandler(selectedBookDetails._id);
  };

  const promptConfirmation = () => {
    Alert.alert('', 'Sure you want to Republish?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: handelRepublishBtnPress},
    ]);
  };

  const handleISBNBtnPress = () => {
    Navigation.navigate('VerifyISBN' as never);
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title="Book Setting" />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          {selectedBookDetails.publishStatus === 'REJECTED' ? (
            <TouchableOpacity
              onPress={() => setIsOpen(!isOpen)}
              style={[
                styles.bookStatusCard,
                {
                  height:
                    isOpen && selectedBookDetails.publishStatus === 'REJECTED'
                      ? responsiveScreenHeight(15)
                      : responsiveScreenHeight(10),
                },
              ]}>
              <View style={styles.tempContainer}>
                <Text style={styles.cardText}>
                  {selectedBookDetails.publishStatus}
                </Text>
                <LoadIcon
                  iconName={isOpen ? 'downcircleo' : 'upcircleo'}
                  iconFamily="AntDesign"
                  style={{fontWeight: 'bold'}}
                  color={'rgb(80, 200, 120)'}
                  size={responsiveFontSize(4)}
                />
              </View>
              {isOpen && selectedBookDetails.publishStatus === 'REJECTED' ? (
                <View style={styles.reasonContainer}>
                  <Text style={styles.reason}>
                    {selectedBookDetails.reason}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ) : selectedBookDetails.publishStatus === 'ISBN-PENDING' ? (
            <TouchableOpacity onPress={handleISBNBtnPress} style={styles.card}>
              <View style={styles.tempContainer}>
                <Text style={styles.cardText}>Update ISBN</Text>
              </View>
            </TouchableOpacity>
          ) : selectedBookDetails.publishStatus === 'ISBN-VERIFIED' ? (
            <TouchableOpacity onPress={handleBookPublish} style={styles.card}>
              <View style={styles.tempContainer}>
                <Text style={styles.cardText}>Publish Book</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.card}>
              <View style={styles.tempContainer}>
                <Text style={styles.cardText}>
                  {selectedBookDetails.publishStatus}
                </Text>
              </View>
            </View>
          )}
          {selectedBookDetails.publishStatus === 'PENDING' ||
          selectedBookDetails.publishStatus === 'REJECTED' ? (
            <TouchableOpacity onPress={promptConfirmation} style={styles.card}>
              <LoadIcon
                iconName="reload1"
                iconFamily="AntDesign"
                style={{fontWeight: 'bold'}}
                color={'rgb(80, 200, 120)'}
                size={responsiveFontSize(4)}
              />
              <Text style={styles.cardText}>Republish</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity onPress={handleBookEdit} style={styles.card}>
            <LoadIcon
              iconName="book-edit-outline"
              iconFamily="MaterialCommunityIcons"
              style={{fontWeight: 'bold'}}
              color={'rgb(80, 200, 120)'}
              size={responsiveFontSize(4)}
            />
            <Text style={styles.cardText}>Edit Book</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default BookSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  body: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(2),
  },
  contentContainer: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    gap: responsiveScreenWidth(5),
    borderRadius: responsiveScreenHeight(1.5),
    height: responsiveScreenHeight(10),
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
    marginVertical: responsiveScreenHeight(2),
  },
  bookStatusCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveScreenWidth(5),
    borderRadius: responsiveScreenHeight(1.5),
    paddingHorizontal: responsiveScreenWidth(4),
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
    marginVertical: responsiveScreenHeight(2),
  },
  cardText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: 'rgb(80, 200, 120)',
  },
  reasonContainer: {
    marginTop: responsiveScreenHeight(1),
  },
  tempContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reason: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
  },
});
