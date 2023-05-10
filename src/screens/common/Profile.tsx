import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/Homepages/Profile/HeaderComponent';
import {
  colorGrey,
  colorPrimary,
  white,
} from '../../../assests/Styles/GlobalTheme';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import LoadIcon from '../../components/common/LoadIcons';
import {systemGrey} from '../../../assests/Styles/GlobalTheme';
import {deleteUserData} from '../../utils/helperFunctions/auth';
import {updateUserData} from '../../redux/reducers/userReducer';

const path = '../../../assests/images/profile.jpg';

const ProfileNavData = [
  {
    name: 'Change Password',
    screenName: 'ResetPassword',
  },
  {
    name: 'Privacy Policy',
    screenName: 'PrivacyPolicy',
  },
  {
    name: 'Logout',
    screenName: 'Logout',
  },
];

const Profile = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {userDetails} = useSelector((state: any) => state.user);
  const handelLogoutPress = () => {
    Alert.alert('', 'Sure you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Logout', onPress: handleLogout},
    ]);
  };

  const handleLogout = async () => {
    await deleteUserData();
    dispatch(updateUserData(false));
  };

  const handleProfileEdit = () => {
    Navigation.navigate('EditProfile' as never);
  }

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.body}>
        <View style={styles.userDetails}>
          <View style={styles.leftContainer}>
          {userDetails?.image ? (
               <Image style={styles.image} source={{uri: userDetails?.image}} alt="Profile" />
            ) : (
              <Image style={styles.image} source={require(path)} alt="Profile" />
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userDetails.fullName}</Text>
              <Text style={styles.userEmail}>{userDetails.email}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={handleProfileEdit}>
              <LoadIcon
                iconFamily="MaterialCommunityIcons"
                iconName="account-edit"
                style={{}}
                color={colorPrimary}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        {ProfileNavData.map(navItem => {
          const handleNavItemPress = () => {
            if (navItem.name === 'Logout') {
              handelLogoutPress();
            } else {
              Navigation.navigate(navItem.screenName as never);
            }
          };
          return (
            <TouchableOpacity
              key={navItem.name}
              onPress={handleNavItemPress}
              style={styles.itemContainer}>
              <Text style={styles.itemText}>{navItem.name}</Text>
              <LoadIcon
                iconFamily="MaterialIcons"
                iconName="keyboard-arrow-right"
                size={25}
                color="black"
                style={{}}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  body: {
    paddingVertical: responsiveScreenHeight(3),
    paddingHorizontal: responsiveScreenWidth(3),
  },
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: systemGrey,
    borderBottomWidth: 2,
    paddingBottom: responsiveScreenHeight(1),
  },
  image: {
    width: responsiveScreenWidth(12),
    height: responsiveScreenWidth(12),
    borderRadius: responsiveScreenWidth(7),
    resizeMode: 'cover',
  },
  userInfo: {},
  leftContainer: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    width: '80%',
  },
  userName: {
    fontSize: responsiveFontSize(2.4),
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  userEmail: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    opacity: 0.7,
    letterSpacing: 0.4,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    paddingVertical: responsiveScreenHeight(2.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: systemGrey,
    borderBottomWidth: 2,
  },
  itemText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
  },
});
