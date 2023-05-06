import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/core';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assests/Styles/GlobalTheme';
import LoadIcon from '../../common/LoadIcons';
import {
  EditChapter,
  ResetChapterDetails,
  UpdateSelectedChapter,
} from '../../../redux/reducers/chaptersReducer';
import ButtonPrimary from '../../common/buttons/ButtonPrimary';
import { SetStartingPageNumber } from '../../../redux/reducers/eBookReaderReducer';

interface chapter {
  _id: string;
  chapterName: string;
  chapterNo: number;
  endingPageNo: number;
  startingPageNo: number;
}

interface chapterProps {
  chapter: chapter;
}

const RenderChapter: React.FC<chapterProps> = ({chapter}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleEditPress = () => {
    dispatch(EditChapter(chapter));
    navigation.navigate('AddChaptersForm' as never);
  };

  const handleChapterRead = () => {
    dispatch(UpdateSelectedChapter(chapter));
    dispatch(SetStartingPageNumber(chapter.startingPageNo));
    navigation.navigate('EBookReader' as never);
  }

  return (
    <View style={styles.chapter}>
      <Text style={styles.chapterNo}>{`${chapter.chapterNo}.`}</Text>
      <View style={styles.chapterBody}>
        <Text style={styles.chapterName}>{chapter.chapterName}</Text>
        <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleChapterRead}>
            <LoadIcon
              iconFamily="FontAwesome5"
              iconName="book-reader"
              style={{}}
              size={25}
              color={colorSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditPress}>
            <LoadIcon
              iconFamily="Feather"
              iconName="edit"
              style={{}}
              size={25}
              color={colorSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ChaptersListComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  const handlePress = () => {
    dispatch(ResetChapterDetails());
    navigation.navigate('AddChaptersForm' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.chapterList}
          contentContainerStyle={styles.contentContainerStyle}
          data={selectedBookDetails.chapters}
          renderItem={({item}) => <RenderChapter chapter={item} />}
        />
      </View>
      <View style={styles.btnContainer}>
         <ButtonPrimary label='Add Chapter' handleBtnPress={handlePress} />
      </View>
    </View>
  );
};

export default ChaptersListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  listContainer: {
    height: responsiveScreenHeight(35)
  },
  chapter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
    paddingVertical: responsiveScreenHeight(2),
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  chapterNo: {
    color: colorPrimary,
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
  },
  chapterBody: {
    flex: 1,
    marginLeft: responsiveScreenWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chapterName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    color: 'black',
  },
  chapterList: {
    flex: 1,
  },
  btnContainer: {
    width: '100%',
    borderRadius: responsiveScreenWidth(9),
    backgroundColor: colorSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    width: responsiveScreenWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: responsiveScreenWidth(2),
  },
  contentContainerStyle: {
    paddingBottom: responsiveScreenHeight(5),
  },
});
