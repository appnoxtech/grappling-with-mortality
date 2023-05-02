import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from '../screens/auth/LandingPage';
import Homepages from '../screens/Homepage';

const Stack = createNativeStackNavigator();

const UserRoutes = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Homepage"
        component={Homepages}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default UserRoutes;
