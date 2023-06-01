import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import LoadIcon from '../../common/LoadIcons';
import {colorSecondary} from '../../../../assests/Styles/GlobalTheme';
import {Swipeable} from 'react-native-gesture-handler';

const data = [
  {
    id: 'qqweqwe3',
    message: 'Robin Sharma raised an book approval request.',
    date: '2 days ago',
  },
  {
    id: 'zcver4fw',
    message:
      'You have not listen a new book from the last 5 days. Get new launched collection.',
    date: '3 days ago',
  },
];

const RenderDeleteActionContainer:React.FC<any> = () => {
    return (
       <View style={styles.deleteContainer}>
          <TouchableOpacity style={styles.deleteBtn}>
            <LoadIcon iconFamily='MaterialIcons' iconName='delete' size={30} color='white' style={{}} />
          </TouchableOpacity>
       </View>
    )
}

const RenderNotification: React.FC<{
  item: {id: string; message: string; date: string};
}> = ({item}) => {
  return (
    <Swipeable renderRightActions={RenderDeleteActionContainer}>
      <View key={item.id} style={styles.notificationContainer}>
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
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const NotificationListContainer = () => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.notificationListContainer}
        data={data}
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
  contentContainer: {},
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
    alignItems: 'center'
  },
  deleteBtn: {width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}
});
