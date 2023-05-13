import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {
  AddAudioChapterService,
  UpdateAudioChapterService,
} from '../../services/author/AudioBookService';
import useGetSelectedBookDetails from './GetSelectedBookDetailsHook';
import {Alert} from 'react-native';
import {Audio} from '../../interfaces/reducer/audioStore.interface';

const SucessMsg = `Audio Chapter Added Sucessfully.`;
const UpdateMsg = 'Audio Chapter Updated Sucessfully.';

const useAddAudioChapterHook = () => {
  const GetSelectedBookDetailsServiceHandler = useGetSelectedBookDetails();
  const {selectedBookDetails} = useSelector((state: any) => state.author);
  const navigation = useNavigation();

  const AddAudioChapterServiceHandler = async (audioData: any) => {
    try {
      const oldList = selectedBookDetails?.audio?.length
        ? selectedBookDetails?.audio?.map((item: any) => {
            return {
              audioLink: item.audioLink,
              chapterName: item.chapterName,
            };
          })
        : [];
      const data = {
        bookId: selectedBookDetails._id,
        audio: [...oldList, audioData],
      };
      console.log('data', data);

      await AddAudioChapterService(data);
      await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
      Alert.alert('', SucessMsg);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error: any) {
      Alert.alert('Error', error.response.data);
    }
  };

  const UpdateAudioChapterServiceHandler = async (audioData: Audio) => {
    try {
      const oldList = selectedBookDetails?.audio?.length
        ? selectedBookDetails?.audio
        : [];
      const data = {
        bookId: selectedBookDetails._id,
        audio: [...oldList, audioData],
      };
      await UpdateAudioChapterService(data);
      if (selectedBookDetails._id) {
        await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
        Alert.alert('', UpdateMsg);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    } catch (error: any) {
      Alert.alert('Error', error.response.data[0].msg);
    }
  };

  const UpdateAudioChapterItemServiceHandler = async (audioData: Audio) => {
    try {
      const NewChapterList = [...selectedBookDetails.audio];
      const index = NewChapterList.findIndex((item: Audio) => item._id === audioData._id);
      
      NewChapterList[index] = audioData;
      const newChapterObj = {
          audio: [...NewChapterList],
          bookId: selectedBookDetails._id
      };
      
      await UpdateAudioChapterService(newChapterObj);
      if(selectedBookDetails._id){
          await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
          Alert.alert('', UpdateMsg);
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
    UpdateAudioChapterServiceHandler,
    UpdateAudioChapterItemServiceHandler
  };
};

export default useAddAudioChapterHook;
