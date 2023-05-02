import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {AddAudioChapterService} from '../../services/author/AudioBookService';
import useGetSelectedBookDetails from './GetSelectedBookDetailsHook';
import {Alert} from 'react-native';

const SucessMsg =  `Congratulations !','Audio Book Added Sucessfully.`;

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
      Alert.alert(SucessMsg);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error: any) {
      console.log('error.response.data', error.response.data);
      
      Alert.alert('Error', error.response.data);
    }
  };
  return AddAudioChapterServiceHandler;
};

export default useAddAudioChapterHook;
