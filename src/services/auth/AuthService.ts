import axios from 'axios';
import { GetFCMToken } from '../../utils/PushNotification.helper';
import { Platform } from 'react-native';
import { loginData, resetPassword, signupData, ssoData } from '../../interfaces/auth/authServiceInterface';

const URL = 'http://192.168.68.101:5000/api/';

export const SsoService = async (data: ssoData) => {
    const FCMToken = await GetFCMToken();
    
    const newData = Platform.OS === 'android' ? 
    {...data, notificationToken: FCMToken} : data;
  
    const url = `${URL}account/single-sign-on`;
    console.log('Data', data);
    
    return axios.post(url, newData);
  };
  
  export const LoginServices = async (data: loginData) => {
    const url = `${URL}access/oauth/log-in`;
    const FCMToken = await GetFCMToken();
  
    const newData = Platform.OS === 'android' ? 
    {...data, notificationToken: FCMToken} : data;
    
    console.log('NewData', newData);
    
    return axios.post(url, newData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  export const RegisterService = async (data: signupData) => {
    console.log('Data', data);
    
    const url = `${URL}access/oauth/sign-up`;
    console.log('url', url);
    
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  export const ResetPasswordServices = async (data: resetPassword) => {
    const url = `${URL}access/oauth/forgot-password`;
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };