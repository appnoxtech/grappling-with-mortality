import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assests/Styles/GlobalTheme';
import LoadIcon from '../../common/LoadIcons';
import {
  EditEbook,
  ResetAudioEbookFormInput,
  UpdateSelectedAudioBook,
} from '../../../redux/reducers/audioEbookReducer';
import TrackPlayer from 'react-native-track-player';

interface audio {
  _id: string;
  chapterName: string;
  audioLink: string;
}
interface chapterProps {
  chapter: audio;
  index: number;
}

const RenderChapter: React.FC<chapterProps> = ({chapter, index}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleEditPress = () => {
    dispatch(EditEbook(chapter));
    navigation.navigate('AddAudioChaptersForm' as never);
    TrackPlayer.skip(index);
  };

  const handleAudioBookChapterPlay = () => {
    const data = {...chapter, index}
    dispatch(UpdateSelectedAudioBook(data));
    navigation.navigate('AudioEbookPlayer' as never);
  }
  return (
    <View style={styles.chapter}>
      <Text style={styles.chapterNo}>{`${index + 1}.`}</Text>
      <View style={styles.chapterBody}>
        <Text style={styles.chapterName}>{chapter.chapterName}</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleAudioBookChapterPlay}>
            <LoadIcon
              iconFamily="Ionicons"
              iconName="play-circle"
              style={{}}
              size={30}
              color={colorSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditPress}>
            <LoadIcon
              iconFamily="MaterialCommunityIcons"
              iconName="circle-edit-outline"
              style={{}}
              size={30}
              color={colorSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function AudioChaptersListComponent() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  const handlePress = () => {
    dispatch(ResetAudioEbookFormInput());
    navigation.navigate('AddAudioChaptersForm' as never);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.chapterList}
        data={selectedBookDetails.audio}
        renderItem={({item, index}) => (
          <RenderChapter chapter={item} index={index} />
        )}
      />
      <TouchableOpacity onPress={handlePress} style={styles.btnContainer}>
        <LoadIcon
          iconFamily="FontAwesome5"
          iconName="plus"
          color="white"
          style={{}}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  chapter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
    paddingTop: responsiveScreenHeight(2),
    paddingBottom: responsiveScreenHeight(1),
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
    alignItems: 'flex-start',
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
    width: responsiveScreenWidth(15),
    height: responsiveScreenWidth(15),
    borderRadius: responsiveScreenWidth(9),
    backgroundColor: colorSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: Platform.OS === 'android' ? responsiveScreenWidth(1) : 10,
    bottom:
      Platform.OS === 'android'
        ? responsiveScreenHeight(8)
        : responsiveScreenHeight(10),
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveScreenWidth(2),
    gap: responsiveScreenWidth(3)
  },
});
