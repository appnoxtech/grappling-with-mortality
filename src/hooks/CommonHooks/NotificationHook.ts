import {useNavigation} from '@react-navigation/core';
import messaging from '@react-native-firebase/messaging';

const useNotificationHook = () => {
    const Navigation = useNavigation();
    const NotificationListner = () => {
         // Assume a message-notification contains a "type" property in the data payload of the screen to open
         messaging().onNotificationOpenedApp(remoteMessage => {
             console.log(
               'Notification caused app to open from background state:',
               remoteMessage.notification,
             );
           });
       
           // Check whether an initial notification is available
           messaging()
             .getInitialNotification()
             .then(remoteMessage => {
               if (remoteMessage) {
                 console.log(
                   'Notification caused app to open from quit state:',
                   remoteMessage.notification,
                 );
                 if(remoteMessage.data){
                   Navigation.navigate(remoteMessage.data.screen as never);
                 }
               }
             });
     
             messaging().onMessage(async remoteMessage => {
                 console.log('Notification on forground state ...', remoteMessage);
             })
     } 

     return NotificationListner;
}

export default useNotificationHook;