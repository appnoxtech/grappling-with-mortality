import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepages from '../screens/Author/Homepage/index';
import AddNewBook from '../screens/Author/Screen/AddNewBook';
import AddAuthorDetails from '../screens/Author/Screen/AddAuthorsDetail';
import AddBookDocs from '../screens/Author/Screen/UploadPdf';

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
    </Stack.Navigator>
  );
};

export default AuthorRoutes;