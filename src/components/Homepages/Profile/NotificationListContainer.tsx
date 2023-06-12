import {
  FlatList,
  ScrollView,
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

import LoadIcon from '../../common/LoadIcons';
import {colorSecondary} from '../../../../assests/Styles/GlobalTheme';
import {Swipeable} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {store} from '../../../interfaces/reducer/state';
import {notification} from '../../../interfaces/reducer/user.interface';
import useHandelNotificationServices from '../../../hooks/CommonHooks/GetNotificationListServiceHandler';
import { getDateRefrenceByTimeStamp } from '../../../utils/common';

const RenderNotification: React.FC<{
  item: notification;
}> = ({item}) => {
  const {RemoveNotificationItemServiceHandler} = useHandelNotificationServices();
  
  const RenderDeleteActionContainer: React.FC<any> = () => {
    const handleDeleteNotification = async () => {
      RemoveNotificationItemServiceHandler(item._id);
    };
    return (
      <View style={styles.deleteContainer}>
        <TouchableOpacity
          onPress={handleDeleteNotification}
          style={styles.deleteBtn}>
          <LoadIcon
            iconFamily="MaterialIcons"
            iconName="delete"
            size={30}
            color="white"
            style={{}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={RenderDeleteActionContainer}>
      <View key={item._id} style={styles.notificationContainer}>
        <LoadIcon
          iconFamily="MaterialIcons"
          iconName="circle-notifications"
          size={50}
          style={{}}
          color={colorSecondary}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notification}>{item.message}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{getDateRefrenceByTimeStamp(item.createdAt)}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const NotificationListContainer = () => {
  const {notificationList} = useSelector((store: store) => store.user);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.notificationListContainer}
        data={notificationList}
        renderItem={({item}) => <RenderNotification item={item} />}
      />
    </View>
  );
};

export default NotificationListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(4),
  },
  notificationListContainer: {
    flex: 1,
    paddingVertical: responsiveScreenHeight(2),
  },
  contentContainer: {
    marginBottom: responsiveScreenHeight(10)
  },
  notificationContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: responsiveScreenWidth(3),
    alignItems: 'flex-start',
    marginBottom: responsiveScreenHeight(2),
  },
  notificationTextContainer: {
    flex: 1,
  },
  notification: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: '500',
  },
  dateContainer: {
    marginTop: responsiveScreenHeight(0.2),
  },
  date: {
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    opacity: 0.5,
  },
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
