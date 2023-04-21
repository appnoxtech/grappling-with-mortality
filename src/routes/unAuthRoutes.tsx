import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from '../screens/auth/LandingPage';
import OTP from '../screens/common/OtpScreen';

const Stack = createNativeStackNavigator();

const UnAuthRoutes = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default UnAuthRoutes;
