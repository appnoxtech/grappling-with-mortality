import { Alert } from "react-native";
import {useNavigation} from '@react-navigation/core';
import { UpdateChaptersService } from "../../services/author/BooksServices"
import useGetSelectedBookDetails from "./GetSelectedBookDetailsHook";
import { useSelector } from "react-redux";
import { Chapter } from "../../interfaces/author/chapter.interface";
import { store } from "../../interfaces/reducer/state";

const SucessMsg = "New Chapter Added Successfully.";
const SuccessUpdate = "Chapter Updated Successfully.";

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
              Alert.alert('', SucessMsg);
              setTimeout(() => {
                  navigation.goBack();
              }, 1000);
            }

        } catch (error: any) {
            Alert.alert('Error', error.response.data[0].msg)
        }
    }

    const UpdateSingleChapterServiceHandler = async (chapter: Chapter, chapterId: string) => {
        try {
            const NewChapterList = [...selectedBookDetails.chapters];
            const index = NewChapterList.findIndex((item: Chapter) => item._id === chapterId);
            NewChapterList[index] = chapter;
            const newChapterObj = {
                chapters: [...NewChapterList],
                bookId: selectedBookDetails._id
            };
            console.log('index', index);
            console.log('chapter', chapter);
            console.log('newChapterObj', newChapterObj);
            
            await UpdateChaptersService(newChapterObj);
            if(selectedBookDetails._id){
                await GetSelectedBookDetailsServiceHandler(selectedBookDetails._id);
                Alert.alert('', SuccessUpdate);
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