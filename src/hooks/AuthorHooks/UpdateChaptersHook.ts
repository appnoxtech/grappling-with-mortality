import { Alert } from "react-native";
import {useNavigation} from '@react-navigation/core';
import { UpdateChaptersService } from "../../services/author/BooksServices"
import useGetSelectedBookDetails from "./GetSelectedBookDetailsHook";
import { useSelector } from "react-redux";
import { Chapter } from "../../interfaces/author/chapter.interface";
import { store } from "../../interfaces/reducer/state";

const SucessMsg = "Congratulations !', 'New Chapter Added Successfully.";

const useUpdateChaptersHook = () => {
    const GetSelectedBookDetailsServiceHandler = useGetSelectedBookDetails();
    const {selectedBookDetails} = useSelector((state: store) => state.author);
    const navigation = useNavigation();

    const UpdateChapterServiceHandler = async(chapter: any) => {
        try {
            const newChapterList = {
                chapters: [
                    ...selectedBookDetails.chapters,
                    chapter
                ],
                bookId: selectedBookDetails._id
            };

            await UpdateChaptersService(newChapterList);
            if(selectedBookDetails._id){
              await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
              Alert.alert(SucessMsg);
              setTimeout(() => {
                  navigation.goBack();
              }, 1000);
            }

        } catch (error: any) {
            Alert.alert('Error', error.response.data[0].msg)
        }
    }

    const UpdateSingleChapterServiceHandler = async (chapter: Chapter) => {
        try {
            const NewChapterList = [...selectedBookDetails.chapters];
            const index = NewChapterList.findIndex((item: Chapter) => item._id === chapter._id);
            NewChapterList[index] = {
                ...chapter
            }
            const newChapterObj = {
                chapters: [...NewChapterList],
                bookId: selectedBookDetails._id
            };
            
            await UpdateChaptersService(newChapterObj);
            if(selectedBookDetails._id){
                await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
                Alert.alert(SucessMsg);
                setTimeout(() => {
                    navigation.goBack();
                }, 1000);
              }
        } catch (error: any) {
            Alert.alert('Error', error.response.data[0].msg)
        }
    }

    return {UpdateChapterServiceHandler, UpdateSingleChapterServiceHandler};
}

export default useUpdateChaptersHook;