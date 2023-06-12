import { user } from '../../interfaces/auth/loginInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogoutService } from '../../services/auth/AuthService';

export const saveUserData = async (data: user) => {
  try {
    await AsyncStorage.setItem('userDetails', JSON.stringify(data));
  } catch (error) {
    console.log('Error', error);
  }
};

export const getUserDataFromLocalStorage = async () => {
  try {
    const data = await AsyncStorage.getItem('userDetails');
    if (data) {
      const userDetail = JSON.parse(data);
      return userDetail;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error', error);
  }
};

export const deleteUserData = async () => {
  try {
    await AsyncStorage.removeItem('userDetails');
    await LogoutService();
  } catch (error) {
    console.log('Error', error);
  }
};
