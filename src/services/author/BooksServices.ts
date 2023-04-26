import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

export const AddNewBookService = async (data: any) => {
    const url = `${URL}book/add-book`;
    const user = await getUserDataFromLocalStorage();
    return axios.post(url, data, {
      headers: {
        'x-auth-token': user.token,
      },
    });
};

export const AuthorBookListService = async() => {
  const url = `${URL}book/get-all-book-of-author`;
  const user = await getUserDataFromLocalStorage();
  return axios.get(url, {
    headers: {
      'x-auth-token': user.token,
    },
  });
};

export const GetBookListService = async() => {
  const url = `${URL}book/get-all-book`;
  const user = await getUserDataFromLocalStorage();
  console.log('url', url);
  console.log('user', user)
  return axios.get(url, {
    headers: {
      'x-auth-token': user.token,
    },
  });
};

export const UpdateBookService = async(newData: any) => {
  const url = `${URL}book/update-book`;
  const user = await getUserDataFromLocalStorage();
  return axios.patch(url, newData, {
    headers: {
      'x-auth-token': user.token,
    },
  });
};

export const DeleteBooksService = async(bookId: string) => {
  const url = `${URL}account/delete-book/${bookId}`;
  const user = await getUserDataFromLocalStorage();
  return axios.delete(url, {
    headers: {
      'x-auth-token': user.token,
    },
  });
}