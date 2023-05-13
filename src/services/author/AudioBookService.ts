import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

export const AddAudioChapterService = async (data: any) => {
    const url = `${URL}audio/add-audio-book`;
    const user = await getUserDataFromLocalStorage();
  
    return axios.post(url, data, {
        headers: {
          'x-auth-token': user.token,
        },
      });
}

export const UpdateAudioChapterService = async (data: any) => {
  const url = `${URL}audio/update-audio-book`;
  const user = await getUserDataFromLocalStorage();

  return axios.put(url, data , {
      headers: {
        'x-auth-token': user.token,
      },
    });
}