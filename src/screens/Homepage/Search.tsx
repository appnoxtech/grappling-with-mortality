import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorSecondary, white} from '../../../assests/Styles/GlobalTheme';
import HeaderComponent from '../../components/homepages/Profile/HeaderComponent';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Lottie from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import useAdminServiceHandlers from '../../hooks/AdminServiceHandlers/AdminServiceHandlerHooks';
import {UpdateSearchResult} from '../../redux/reducers/search.reducer';

interface props {
  book: any;
}

const RenderSearchResultItem: React.FC<props> = ({book}) => {
  return (
    <View style={styles.bookItemContainer}>
      <Image
        resizeMode="cover"
        source={{uri: book.bookImage}}
        alt="book"
        style={styles.image}
      />
    </View>
  );
};

const ListHeaderComponent = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const {bookList} = useSelector((store: store) => store.common);
  const {SearchBookServiceHandler} = useAdminServiceHandlers();

  useEffect(() => {
    if (value.length >= 1) {
      SearchBookServiceHandler(value);
    } else {
      console.log('jhino');
      dispatch(UpdateSearchResult(bookList));
    }
  }, [value]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={'rgba(0,0,0,0.7)'}
        placeholder={'Enter book name'}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

const NoBookFound = () => {
  const path = '../../../assests/animations/NoResultFound.json';
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.iconContainer}>
        <Lottie
          resizeMode="cover"
          style={styles.animationStyle}
          source={require(path)}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const Search = () => {
  const {searchResult} = useSelector((store: store) => store.search);
  return (
    <View style={styles.container}>
      <HeaderComponent title="Search Books" />
      <View style={styles.body}>
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={item => item._id}
          data={searchResult}
          style={styles.searchListContainer}
          ListEmptyComponent={<NoBookFound />}
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => <RenderSearchResultItem book={item} />}
          initialNumToRender={3}
        />
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
  searchListContainer: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(2),
  },
  contentContainer: {},
  bookItemContainer: {
    width: '45%',
    marginHorizontal: '2.5%',
    marginBottom: responsiveScreenHeight(2),
    height: responsiveScreenHeight(30),
    borderRadius: responsiveScreenHeight(2),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveScreenHeight(2),
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
  iconContainer: {
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(30),
  },
  animationStyle: {},
});
