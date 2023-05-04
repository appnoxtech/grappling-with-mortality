import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import {store} from '../../../../interfaces/reducer/state';
import LoadIcon from '../../LoadIcons';
import {
  colorPrimary,
  colorSecondary,
  white,
} from '../../../../../assests/Styles/GlobalTheme';
import PlayerControls from './PlayerControls';

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
  const navigation = useNavigation();
  const {selectedAudioBook} = useSelector((store: store) => store.audio);

  const handleAudioBookChapterPlay = () => {
    const data = {...chapter, index};
  };

  return (
    <View style={styles.chapter}>
      <Text style={styles.chapterNo}>{`${index + 1}.`}</Text>
      <View style={styles.chapterBody}>
        <Text style={styles.chapterName}>{chapter.chapterName}</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleAudioBookChapterPlay}>
            <LoadIcon
              iconFamily="Ionicons"
              iconName={
                selectedAudioBook.index === index
                  ? 'pause-circle'
                  : 'play-circle'
              }
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

const EbookPlayerComponent = () => {
  const {selectedAudioBook} = useSelector((store: store) => store.audio);
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  const [isListVisible, setIsListVisible] = useState(true);

  const togggleChapterList = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textPrimary}>{`Chapter ${
        selectedAudioBook.index + 1
      }: ${selectedAudioBook.chapterName}`}</Text>
      <PlayerControls />
      <View style={styles.currentChapter}>
        <Text style={styles.textSecondary}>{`Chapter ${
          selectedAudioBook.index + 1
        }: ${selectedAudioBook.chapterName}`}</Text>
        <TouchableOpacity onPress={togggleChapterList}>
          <LoadIcon
            iconFamily="Entypo"
            iconName={isListVisible ? "chevron-up" : "chevron-down"}
            style={{}}
            color={colorPrimary}
            size={30}
          />
        </TouchableOpacity>
      </View>
      {isListVisible ? (
        <FlatList
          style={styles.chapterList}
          data={selectedBookDetails.audio}
          renderItem={({item, index}) => (
            <RenderChapter chapter={item} index={index} />
          )}
        />
      ) : null}
    </View>
  );
};

export default EbookPlayerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4),
  },
  textPrimary: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.8),
    fontWeight: '600',
    color: 'black',
  },
  actionContainer: {
    marginTop: responsiveScreenHeight(1.8),
    paddingHorizontal: responsiveScreenWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentChapter: {
    marginTop: responsiveScreenHeight(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  textSecondary: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500',
    color: 'black',
  },
  chapterList: {
    flex: 1,
  },
  chapter: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chapterName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    color: 'black',
  },
});
