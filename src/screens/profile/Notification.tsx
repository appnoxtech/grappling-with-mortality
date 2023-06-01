import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {white} from '../../../assests/Styles/GlobalTheme';
import HeaderComponent from '../../components/homepages/Profile/HeaderComponent';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import HeaderWithTitle from '../../components/common/headers/HeaderWithTitle';
import NotificationListContainer from '../../components/homepages/Profile/NotificationListContainer';
import LoadIcon from '../../components/common/LoadIcons';

const NotificationData = [];

const Notification = () => {
  return (
    <View style={styles.container}>
      <HeaderWithTitle title={'Notification'} />
      {NotificationData.length ? (
        <NotificationListContainer />
      ) : (
        <View style={styles.body}>
            <View style={styles.emptyNotificationContainer}>
               <LoadIcon iconFamily='Ionicons' iconName='notifications-sharp' color='rgba(0,0,0,0.5)' style={{}} size={35} />
               <View style={styles.textPrimaryContainer}>
                <Text style={styles.textPrimary}>No New Notifications</Text>
               </View>
            </View>
        </View>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  pageNameContainer: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(6.5)
        : responsiveScreenHeight(1.7),
    left: responsiveScreenWidth(15),
    alignItems: 'center',
  },
  pageName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: white,
  },
  body: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPrimaryContainer: {
    marginTop: responsiveScreenHeight(1),
  },
  textPrimary: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    opacity: 0.5
  },
  emptyNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
