import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

export const AddAudioChapterService = async (data: any) => {
    const url = `${URL}audio/add-audio-book`;
    const user = await getUserDataFromLocalStorage();
    console.log('url', url);
    console.log('data', data);
    
    return axios.post(url, data, {
        headers: {
          'x-auth-token': user.token,
        },
      });
}