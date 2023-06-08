import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepages from '../screens/homepage/index';
import AddNewBook from '../screens/myBook/screen/AddNewBook';
import AddAuthorDetails from '../screens/myBook/screen/AddAuthorsDetail';
import AddBookDocs from '../screens/myBook/screen/UploadPdf';
import BookDetails from '../screens/myBook/screen/BookDetails';
import AddChaptersForm from '../screens/myBook/screen/AddChaptersForm';
import AddAudioChaptersForm from '../screens/myBook/screen/AddAudioChaptersForm';
import AudioEbookPlayer from '../screens/common/AudioEbookPlayer';
import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
import ResetPassword from '../screens/profile/ResetPassword';
import EditProfile from '../screens/profile/EditProfile';
import EBookReader from '../screens/myBook/screen/ReadBookChapter';
import BookSetting from '../screens/myBook/screen/BookSetting';
import Notification from '../screens/profile/Notification';

const Stack = createNativeStackNavigator();

const AuthorRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homepage"
        component={Homepages}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="AddNewBook"
        component={AddNewBook}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="AddAuthorDetails"
        component={AddAuthorDetails}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="AddBookDocs"
        component={AddBookDocs}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="AddChaptersForm"
        component={AddChaptersForm}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="AddAudioChaptersForm"
        component={AddAudioChaptersForm}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="AudioEbookPlayer"
        component={AudioEbookPlayer}
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
        name="BookSetting"
        component={BookSetting}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
     <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default AuthorRoutes;
