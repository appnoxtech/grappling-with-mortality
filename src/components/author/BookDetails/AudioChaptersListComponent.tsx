import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';
import { colorPrimary, colorSecondary } from '../../../../assests/Styles/GlobalTheme';
import LoadIcon from '../../common/LoadIcons';

interface audio {
    _id: string;
    chapterName: string;
    audioLink: string;
}
interface chapterProps {
    chapter: audio;
    index: number
}

const RenderChapter: React.FC<chapterProps> = ({chapter, index}) => {
    const handleEditPress = () => {};
    return (
      <View style={styles.chapter}>
        <Text style={styles.chapterNo}>{`${index+1}.`}</Text>
        <View style={styles.chapterBody}>
          <Text style={styles.chapterName}>{chapter.chapterName}</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={handleEditPress}>
              <LoadIcon
                iconFamily="FontAwesome5"
                iconName="play-circle"
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

export default function AudioChaptersListComponent() { 
  const navigation = useNavigation();
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  const handlePress = () => {
    navigation.navigate('AddAudioChaptersForm' as never);
  };
  
  return (
    <View style={styles.container}>
    <FlatList
      style={styles.chapterList}
      data={selectedBookDetails.audio}
      renderItem={({item, index}) => <RenderChapter chapter={item} index={index} />}
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
  )
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
      width: responsiveScreenWidth(10),
      height: responsiveScreenWidth(10),
      borderRadius: responsiveScreenWidth(9),
      backgroundColor: colorSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 10,
      bottom: responsiveScreenHeight(10),
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: responsiveScreenWidth(2),
    },
  });