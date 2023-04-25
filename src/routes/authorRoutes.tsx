import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepages from '../screens/Author/Homepage/index';

const Stack = createNativeStackNavigator();

const AuthorRoutes = () => {
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

export default AuthorRoutes;