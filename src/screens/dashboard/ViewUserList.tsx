import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {white} from '../../../assests/Styles/GlobalTheme';
import {store} from '../../interfaces/reducer/state';
import {user} from '../../interfaces/reducer/admin.interface';
import HeaderWithTitle from '../../components/common/headers/HeaderWithTitle';

const path = '../../../assests/images/profile.jpg';

interface props {
  route: {
    params: {
      type: 'CUSTOMER' | 'AUTHOR';
    };
  };
}

const RenderUserCard: React.FC<{item: user}> = ({item}) => {
  const Navigation = useNavigation();
  const handelUserProfileClick = () => {
    Navigation.navigate('AuthorProfile' as never, {author: item} as never);
  };
  return (
    <TouchableOpacity
      onPress={handelUserProfileClick}
      key={item._id}
      style={styles.profileContainer}>
      <View style={styles.imgContainer}>
        <Image
          source={item.image ? {uri: item.image} : require(path)}
          alt={item.fullName}
          style={styles.img}
        />
      </View>
      <Text style={styles.name}>{item.fullName.split(' ')[0]}</Text>
    </TouchableOpacity>
  );
};

const ViewUserList: React.FC<any> = ({route}) => {
  const {type} = route.params;
  const {userList, authorList} = useSelector((store: store) => store.admin);
  const data = type === 'AUTHOR' ? authorList : userList;
  
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        title={type === 'AUTHOR' ? "Author's List" : 'User List'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.userListContainer}
        contentContainerStyle={styles.contentContainer}>
        {data.map(item => (
          <React.Fragment key={item._id}>
            <RenderUserCard item={item} />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewUserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  userListContainer: {
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4),
  },
  profileContainer: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
});
