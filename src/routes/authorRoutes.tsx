import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepages from '../screens/Author/Homepage/index';
import AddNewBook from '../screens/Author/Screen/AddNewBook';
import AddAuthorDetails from '../screens/Author/Screen/AddAuthorsDetail';
import AddBookDocs from '../screens/Author/Screen/UploadPdf';
import BookDetails from '../screens/Author/Screen/BookDetails';
import AddChaptersForm from '../screens/Author/Screen/AddChaptersForm';
import AddAudioChaptersForm from '../screens/Author/Screen/AddAudioChaptersForm';
import AudioEbookPlayer from '../screens/common/AudioEbookPlayer';
import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
import ResetPassword from '../screens/profile/ResetPassword';
import EditProfile from '../screens/profile/EditProfile';
import EBookReader from '../screens/Author/Screen/ReadBookChapter';

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
    </Stack.Navigator>
  );
};

export default AuthorRoutes;
