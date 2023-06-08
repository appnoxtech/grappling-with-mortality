import {Platform, StyleSheet, Text} from 'react-native';
import React, { useEffect, useRef } from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from './src/redux/store/store';
import StackNavigation from './src/routes/StackNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationRef, requestUserPermission, NotificationListner } from './src/utils/PushNotification.helper';
import useNotificationHook from './src/hooks/CommonHooks/NotificationHook';

const App = () => {

  const handelPushNotification = () => {
    requestUserPermission();
    NotificationListner();
  };

  useEffect(() => {
    handelPushNotification()
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
        <GestureHandlerRootView style={{ flex: 1 }}>
           <StackNavigation />
        </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
