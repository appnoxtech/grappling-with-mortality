import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';
import { RebublishBookInterfce, pendingBookDataInterface } from '../../interfaces/common/common';

export const GetUserListServices = async () => {
    const url = `${URL}account/get-all-user`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
        headers: {
            'x-auth-token': user.token,
          },
    })
}

export const GetAuthorListServices = async () => {
    const url = `${URL}account/get-all-author`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
        headers: {
            'x-auth-token': user.token,
          },
    })
}

export const SearchUserService = async(searchStr: string) => {
    const url = `${URL}account/get-all-user?subStr=${searchStr}`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
        headers: {
            'x-auth-token': user.token,
          },
    })
}

export const SearchAuthorService = async(searchStr: string) => {
    const url = `${URL}account/search-author/${searchStr}`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
        headers: {
            'x-auth-token': user.token,
          },
    })
}

export const GetPendingVerificationBookListService = async() => {
    const url = `${URL}book/get-different-stages-book/PENDING`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
        headers: {
            'x-auth-token': user.token,
          },
    })
}

export const UpdatePendingBookStatusService = async(data: pendingBookDataInterface) => {
    const url = `${URL}book/update-status-of-book`;
    const user = await getUserDataFromLocalStorage();
    return axios.put(url, data, {
        headers: {
            'x-auth-token': user.token,
          },
    });
}

export const RepublishBookService = async(bookId: string) => {
    const url = `${URL}book/retry-for-publish/${bookId}`; 
    const user = await getUserDataFromLocalStorage();
    return axios.put(url, {} , {
        headers: {
            'x-auth-token': user.token,
          },
    });
}
