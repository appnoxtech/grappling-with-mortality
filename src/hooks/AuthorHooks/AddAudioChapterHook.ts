import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {AddAudioChapterService} from '../../services/author/AudioBookService';
import useGetSelectedBookDetails from './GetSelectedBookDetailsHook';
import {Alert} from 'react-native';
import { Audio } from '../../interfaces/reducer/audioStore.interface';

const congrats = 'Congratulations !';
const SucessMsg =  `Audio Chapter Added Sucessfully.`;
const UpdateMsg = 'Audio Chapter Updated Sucessfully.'

const useAddAudioChapterHook = () => {
  const GetSelectedBookDetailsServiceHandler = useGetSelectedBookDetails();
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  const navigation = useNavigation();

  const AddAudioChapterServiceHandler = async (audioData: any) => {
    try {
      const oldList = selectedBookDetails?.audio
        ? selectedBookDetails?.audio
        : [];
      const data = {
        bookId: selectedBookDetails._id,
        audio: [...oldList, audioData],
      };
      await AddAudioChapterService(data);
      await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
      Alert.alert(congrats, SucessMsg);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error: any) {
      Alert.alert('Error', error.response.data);
    }
  };

  const UpdateAudioChapterServiceHandler = async (audioData: Audio) => {
    try {
      const NewChapterList = [...selectedBookDetails.audio];
      const index = NewChapterList.findIndex((item: Audio) => item._id === audioData._id);
      console.log('index ==>', index);
      
      const {audioLink, chapterName} = audioData;
      NewChapterList[index] = {audioLink, chapterName};
      const newChapterObj = {
          audio: [...NewChapterList],
          bookId: selectedBookDetails._id
      };
      
      await AddAudioChapterService(newChapterObj);
      if(selectedBookDetails._id){
          await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
          Alert.alert(congrats, UpdateMsg);
          setTimeout(() => {
              navigation.goBack();
          }, 1000);
        }
  } catch (error: any) {
      Alert.alert('Error', error.response.data[0].msg)
  }
  }
  return {
    AddAudioChapterServiceHandler,
    UpdateAudioChapterServiceHandler
  };
};

export default useAddAudioChapterHook;
