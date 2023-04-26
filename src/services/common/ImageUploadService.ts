import {URL} from '@env';
import axios from 'axios';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';


export const ImageUploadService = async (data: any) => {
   const url = `${URL}upload/image-book-upload`;
   const user = await getUserDataFromLocalStorage();
   console.log('url', url);
   console.log('user', user);
   
   return axios.post(url, data, {
     headers: {
       'x-auth-token': user.token,
       'Content-Type': 'multipart/form-data',
     },
   });
}