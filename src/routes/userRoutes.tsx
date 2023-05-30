import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepages from '../screens/homepage';
import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
import EditProfile from '../screens/profile/EditProfile';
import ResetPassword from '../screens/profile/ResetPassword';
import BookDetails from '../screens/myBook/screen/BookDetails';
import EBookReader from '../screens/myBook/screen/ReadBookChapter';
import AudioEbookPlayer from '../screens/common/AudioEbookPlayer';

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
      <Stack.Screen
        name="EBookReader"
        component={EBookReader}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="AudioEbookPlayer"
        component={AudioEbookPlayer}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default UserRoutes;
