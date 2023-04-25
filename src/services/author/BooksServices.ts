import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

export const AddNewBook = async (data: any) => {
    const url = `${URL}event/create-trip`;
    const user = await getUserDataFromLocalStorage();
    console.log('url', url);
    return axios.post(url, data, {
      headers: {
        'x-auth-token': user.accessToken,
      },
    });
};