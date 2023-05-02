import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from '../screens/auth/LandingPage';
import OTP from '../screens/common/OtpScreen';
import AppLoadingPage from '../screens/auth/AppLoadingPage';
import ResetPassword from '../screens/auth/ForgetPassword';
import ChangePassword from '../screens/auth/ChangePassword';

const Stack = createNativeStackNavigator();

const UnAuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppLoadPage"
        component={AppLoadingPage}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={OTP}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      
    </Stack.Navigator>
  );
};

export default UnAuthRoutes;
