import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {white} from '../../../../assests/Styles/GlobalTheme';
import HeaderWithBackBtn from '../../../components/common/headers/HeaderWithBackBtn';
import {store} from '../../../interfaces/reducer/state';
import {UpdateSelectedChapter} from '../../../redux/reducers/chaptersReducer';
import { SetStartingPageNumber } from '../../../redux/reducers/eBookReaderReducer';

const EBookReader = () => {
  const dispatch = useDispatch();
  const {startingPage} = useSelector((store: store) => store.bookReader);
  const {selectedChapter} = useSelector((store: store) => store.chapter);
  const {selectedBookDetails} = useSelector((state: store) => state.author);
  const [isLoad, setIsLoad] = useState(false);
  const source = {uri: selectedBookDetails.bookLink, cache: true};
  
  return (
    <View style={styles.container}>
      <HeaderWithBackBtn>
        <View style={styles.chapterNameContainer}>
          <Text style={styles.chapterName}>{selectedChapter.chapterName}</Text>
        </View>
      </HeaderWithBackBtn>
      <View style={styles.chapterContainer}>
        <Pdf
          source={source}
          spacing={0}
          page={startingPage}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            const chapterList = selectedBookDetails.chapters;
            console.log('Page==>', page);
            console.log('selectedChapter.startingPageNo', selectedChapter.startingPageNo);
            
            if (page < selectedChapter.startingPageNo) {
              const index = chapterList.findIndex(
                chapter => chapter._id === selectedChapter._id,
              );
              if (index > 0 && isLoad) {
                const newChapter = chapterList[index - 1];
                dispatch(UpdateSelectedChapter(newChapter));
                dispatch(SetStartingPageNumber(newChapter.endingPageNo));
              }else {
                setIsLoad(true);
              }
            }
            if (page > selectedChapter.endingPageNo) {
              const index = chapterList.findIndex(
                chapter => chapter._id === selectedChapter._id,
              );
              
              if (index !== -1 && index < chapterList.length - 1) {
                const newChapter = chapterList[index + 1];
                dispatch(UpdateSelectedChapter(newChapter));
                dispatch(SetStartingPageNumber(newChapter.startingPageNo));
              }
            }
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
          trustAllCerts={Platform.OS == 'android' ? false : true}
        />
      </View>
    </View>
  );
};

export default EBookReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  chapterNameContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? responsiveScreenHeight(6.5) : responsiveScreenHeight(1.7),
    left: responsiveScreenWidth(15),
  },
  chapterName: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: white,
  },
  chapterContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    backgroundColor: white,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
