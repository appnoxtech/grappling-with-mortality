import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from '../screens/auth/LandingPage';
import Homepages from '../screens/Homepage';
import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
import EditProfile from '../screens/profile/EditProfile';
import ChangePassword from '../screens/auth/ChangePassword';
import ResetPassword from '../screens/profile/ResetPassword';
import BookDetails from '../screens/Author/Screen/BookDetails';

const Stack = createNativeStackNavigator();

const UserRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homepage"
        component={Homepages}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default UserRoutes;
