import {URL} from '@env';
import axios from 'axios';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

export const GetAuthorBooksListByIdService = async(authorId: string) => {
    const url = `${URL}book/get-all-author-books/${authorId}`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
        headers: {
          'x-auth-token': user.token,
        },
    });
}