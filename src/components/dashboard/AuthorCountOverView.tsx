import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {white} from '../../../assests/Styles/GlobalTheme';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LoadIcon from '../common/LoadIcons';
import { user } from '../../interfaces/reducer/admin.interface';

interface props {
  title: string,
  type: 'AUTHOR' | 'CUSTOMER'
  data: Array<user>
};

const path = '../../../assests/images/profile.jpg';

const UserProfileOverView: React.FC<props> = ({title, data, type}) => {
  const Navigation = useNavigation();

  const handelUserProfileClick = (author: user) => {
    Navigation.navigate('AuthorProfile' as never, {author, type} as never)
  };

  const handelViewAllClick = () => {
    Navigation.navigate('ViewUserList' as never , {type} as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.profileListContainer}>
        {data.map(user => {
          return (
            <TouchableOpacity onPress={() => handelUserProfileClick(user)} key={user._id} style={styles.profileContainer}>
              <View style={styles.imgContainer}>
                <Image
                  source={user.image ? {uri: user.image} : require(path)}
                  alt={user.fullName}
                  style={styles.img}
                />
              </View>
              <Text style={styles.name}>{user.fullName.split(" ")[0]}</Text>
            </TouchableOpacity>
          );
        })}
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handelViewAllClick} style={styles.btnContainer}>
             <LoadIcon color={white} iconFamily='AntDesign' iconName='arrowright' size={responsiveScreenHeight(4)} style={{}} />
          </TouchableOpacity>
          <Text style={styles.name}>{'View all'}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserProfileOverView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
    borderRadius: responsiveScreenHeight(2),
    marginTop: responsiveScreenHeight(2)
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  profileListContainer: {
    marginTop: responsiveScreenHeight(3),
    flexDirection: 'row',
    gap: responsiveScreenWidth(5),
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: responsiveScreenHeight(8),
    height: responsiveScreenHeight(8),
    marginBottom: responsiveScreenHeight(1),
  },
  img: {
    width: responsiveScreenHeight(8),
    height: responsiveScreenHeight(8),
    borderRadius: responsiveScreenHeight(10),
  },
  name: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: 'black',
    opacity: 0.9,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  btnContainer: {
    width: responsiveScreenHeight(8),
    height: responsiveScreenHeight(8),
    borderRadius: responsiveScreenHeight(6),
    marginBottom: responsiveScreenHeight(1),
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
