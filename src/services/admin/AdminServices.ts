import axios from 'axios';
import {URL} from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

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
