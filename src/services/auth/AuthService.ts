import axios from 'axios';
import { Platform } from 'react-native';
import { URL } from '@env';
import { GetFCMToken } from '../../utils/PushNotification.helper';
import { loginData, resetPassword, signupData, ssoData } from '../../interfaces/auth/authServiceInterface';
import { getUserDataFromLocalStorage } from '../../utils/helperFunctions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


 export const SsoService = async (data: ssoData) => {
    const FCMToken = await GetFCMToken();
    const newData = Platform.OS === 'android' ? 
    {...data, notificationToken: FCMToken} : data;
    const url = `${URL}account/single-sign-on`;
    
    return axios.post(url, newData);
  };
  
  export const LoginServices = async (data: loginData) => {
    const url = `${URL}account/login`;
    const FCMToken = await GetFCMToken();
    const newData = {...data, notificationToken: FCMToken};
    return axios.post(url, newData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  export const RegisterService = async (data: signupData) => {
    const url = `${URL}account/add-account-user`;
    return axios.post(url, data);
  };
  
  export const ResetPasswordServices = async (data: resetPassword) => {
    const url = `${URL}account/reset-password`;
    return axios.post(url, data);
  };

  export const LogoutService = async() => {
    const url = `${URL}account/log-out`;
    const user = await getUserDataFromLocalStorage();
    let notificationToken = await AsyncStorage.getItem('fcmToken');

    return axios.post(url, {notificationToken}, {
      headers: {
        'x-auth-token': user.token,
      },
    });
  }