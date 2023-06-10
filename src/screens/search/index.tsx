import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorSecondary, white} from '../../../assests/Styles/GlobalTheme';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {user} from '../../interfaces/reducer/admin.interface';
import useAdminServiceHandlers from '../../hooks/AdminServiceHandlers/AdminServiceHandlerHooks';
import {ResetSearchResult} from '../../redux/reducers/search.reducer';

const path = '../../../assests/images/profile.jpg';

const RenderUserCard: React.FC<{item: user; type: 'AUHTOR' | 'CUSTOMER'}> = ({
  item,
  type,
}) => {
  const Navigation = useNavigation();
  const handelUserProfileClick = () => {
    Navigation.navigate(
      'AuthorProfile' as never,
      {author: item, type} as never,
    );
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

const Search: React.FC<any> = ({route}) => {
  const {type} = route.params;
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const {SearchUserServiceHandler, SearchAuthorServiceHandler} =
    useAdminServiceHandlers();
  const {searchResult} = useSelector((state: store) => state.search);

  useEffect(() => {
    if (value) {
      if (type === 'AUTHOR') {
        SearchAuthorServiceHandler(value);
      } else {
        SearchUserServiceHandler(value);
      }
    } else {
      dispatch(ResetSearchResult());
    }
  }, [value]);  

  return (
    <View style={styles.container}>
      <HeaderWithBackBtn />
      <View style={styles.body}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            placeholder={type === 'AUTHOR' ? 'Search Author' : 'Search User'}
            value={value}
            onChangeText={text => setValue(text)}
          />
        </View>
        <View style={{flex: 1,}}>
          {searchResult.length ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.userListContainer}
              contentContainerStyle={styles.contentContainer}
            >
              {searchResult.map(item => <RenderUserCard type={type} item={item} />)}
            </ScrollView>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  body: {
    flex: 1,
  },
  searchContainer: {
    marginVertical: responsiveScreenHeight(2),
    marginHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1.5),
    paddingHorizontal: responsiveScreenWidth(3),
    borderRadius: responsiveScreenHeight(1),
    borderWidth: 1.5,
    borderColor: colorSecondary,
  },
  textInput: {},
  searchResultContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
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
  userListContainer: {
    paddingVertical: responsiveScreenHeight(2),
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: responsiveScreenHeight(2),
    columnGap: responsiveScreenWidth(8),
    paddingHorizontal: responsiveScreenWidth(3)
  },
});
