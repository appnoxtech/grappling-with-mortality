import axios from 'axios';
import { URL } from '@env';
import {getUserDataFromLocalStorage} from '../../utils/helperFunctions/auth';
import { changePasswordData, updatedUserProfile } from '../../interfaces/user/updateProfile.service.interface';

export const ChangePasswordService = async (data: changePasswordData) => {
  const url = `${URL}account/change-password`;
  const user = await getUserDataFromLocalStorage();
  return axios.post(url, data, {
    headers: {
      'x-auth-token': user.token,
    },
  });
};