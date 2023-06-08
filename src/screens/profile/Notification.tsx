import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {white} from '../../../assests/Styles/GlobalTheme';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import HeaderWithTitle from '../../components/common/headers/HeaderWithTitle';
import NotificationListContainer from '../../components/homepages/Profile/NotificationListContainer';
import LoadIcon from '../../components/common/LoadIcons';
import {useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import useNotificationHook from '../../hooks/CommonHooks/NotificationHook';
import useHandelNotificationServices from '../../hooks/CommonHooks/GetNotificationListServiceHandler';
import LoadingScreen from '../common/LoadingScreen';

const Notification = () => {
  const {notificationList} = useSelector((store: store) => store.user);
  const {GetNotificationListServiceHandler} = useHandelNotificationServices();
  
  useEffect(() => {
    GetNotificationListServiceHandler();
  }, []);

  return (
    <LoadingScreen>
      <View style={styles.container}>
        <HeaderWithTitle title={'Notification'} />
        {notificationList?.length ? (
          <NotificationListContainer />
        ) : (
          <View style={styles.body}>
            <View style={styles.emptyNotificationContainer}>
              <LoadIcon
                iconFamily="Ionicons"
                iconName="notifications-sharp"
                color="rgba(0,0,0,0.5)"
                style={{}}
                size={35}
              />
              <View style={styles.textPrimaryContainer}>
                <Text style={styles.textPrimary}>No New Notifications</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </LoadingScreen>
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
    alignItems: 'center',
  },
  textPrimaryContainer: {
    marginTop: responsiveScreenHeight(1),
  },
  textPrimary: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    opacity: 0.5,
  },
  emptyNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
