import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  colorPrimary,
  colorSecondary,
  white,
} from '../../../../assests/Styles/GlobalTheme';
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

const BookSetting = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {selectedBook} = useSelector((state: store) => state.author);
  const [isOpen, setIsOpen] = useState(false);
  const {RepublishBookServiceHandler} = useAdminServiceHandlers();

  const handleBookEdit = () => {
    dispatch(EditNewBook());
    Navigation.navigate('AddNewBook' as never);
  };

  const handelRepublishBtnPress = () => {
    if (selectedBook._id) {
      RepublishBookServiceHandler(selectedBook._id);
    }
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

  console.log('selectedBook',selectedBook);
  

  return (
    <View style={styles.container}>
      <HeaderWithTitle title="Book Setting" />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          {selectedBook.publishStatus === 'REJECTED' ? (
            <TouchableOpacity
              onPress={() => setIsOpen(!isOpen)}
              style={[
                styles.bookStatusCard,
                {
                  height:
                    isOpen && selectedBook.publishStatus === 'REJECTED'
                      ? responsiveScreenHeight(15)
                      : responsiveScreenHeight(10),
                },
              ]}>
              <View style={styles.tempContainer}>
                <Text style={styles.cardText}>
                  {selectedBook.publishStatus}
                </Text>
                <LoadIcon
                  iconName={isOpen ? 'downcircleo' : 'upcircleo'}
                  iconFamily="AntDesign"
                  style={{fontWeight: 'bold'}}
                  color={'rgb(80, 200, 120)'}
                  size={responsiveFontSize(4)}
                />
              </View>
              {isOpen && selectedBook.publishStatus === 'REJECTED' ? (
                <View style={styles.reasonContainer}>
                  <Text style={styles.reason}>{selectedBook.reason}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ) : (
            <View style={styles.card}>
              <View style={styles.tempContainer}>
                <Text style={styles.cardText}>
                  {selectedBook.publishStatus}
                </Text>
                <LoadIcon
                  iconName={isOpen ? 'downcircleo' : 'upcircleo'}
                  iconFamily="AntDesign"
                  style={{fontWeight: 'bold'}}
                  color={'rgb(80, 200, 120)'}
                  size={responsiveFontSize(4)}
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={promptConfirmation}
            style={styles.card}>
            <LoadIcon
              iconName="reload1"
              iconFamily="AntDesign"
              style={{fontWeight: 'bold'}}
              color={'rgb(80, 200, 120)'}
              size={responsiveFontSize(4)}
            />
            <Text style={styles.cardText}>Republish</Text>
          </TouchableOpacity>
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
    fontWeight: '600'
  }
});
