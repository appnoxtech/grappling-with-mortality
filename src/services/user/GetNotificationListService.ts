import axios from 'axios';
import { URL } from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

export const GetNotificationListService = async() => {
    const url = `${URL}book/get-all-notification`;
    const user = await getUserDataFromLocalStorage();
    return axios.get(url, {
        headers: {
            'x-auth-token': user.token,
          },
    })
}

export const DeleteNotificationItemService = async(notificationId: string) => {
    const url = `${URL}book/delete-notification/${notificationId}`;
    const user = await getUserDataFromLocalStorage();
    return axios.delete(url, {
        headers: {
            'x-auth-token': user.token,
          },
    });
}