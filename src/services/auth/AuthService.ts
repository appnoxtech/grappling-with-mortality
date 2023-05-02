import axios from 'axios';
import { Platform } from 'react-native';
import { URL } from '@env';
import { GetFCMToken } from '../../utils/PushNotification.helper';
import { loginData, resetPassword, signupData, ssoData } from '../../interfaces/auth/authServiceInterface';


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
    const newData = Platform.OS === 'android' ? 
    {...data, notificationToken: FCMToken} : data;
    
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
    console.log('data', data);
    
    return axios.post(url, data);
  };