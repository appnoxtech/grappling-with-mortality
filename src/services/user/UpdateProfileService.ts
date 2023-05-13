import axios from 'axios';
import { URL } from '@env';
import {getUserDataFromLocalStorage} from '../../utils/helperFunctions/auth';
import { updatedUserProfile } from '../../interfaces/user/updateProfile.service.interface';

export const UpdateUserProfileService = async (data: updatedUserProfile) => {
  const url = `${URL}account/update-profile`;
  const user = await getUserDataFromLocalStorage();
  return axios.patch(url, data, {
    headers: {
      'x-auth-token': user.token,
    },
  });
};
