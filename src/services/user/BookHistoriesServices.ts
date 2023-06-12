import axios from 'axios';
import { URL } from '@env';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';

export const GetUserBookHistoryService = async(userId: string) => {
  const url = `${URL}book/get-user-activity-history/${userId}`;
  const user = await getUserDataFromLocalStorage();
  return axios.get(url, {
    headers: {
      'x-auth-token': user.token,
    },
  });
}