import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colorPrimary} from '../../../assests/Styles/GlobalTheme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Profile from '../common/Profile';
import Discover from '../discover/index';
import {getUserDataFromLocalStorage} from '../../utils/helperFunctions/auth';
import MyBooks from '../myBook';
import Dashboard from '../dashboard';
import { useDispatch } from 'react-redux';
import { UpdateShowEditorOptions } from '../../redux/reducers/commonReducer';

const Tab = createBottomTabNavigator();

const Homepages = () => {
  const [userData, setUserData] = useState<any>({});
  const dispatch = useDispatch();
  const getUserDetails = async () => {
    const user = await getUserDataFromLocalStorage();
    setUserData(user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Tab.Navigator
      //@ts-ignore
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Discover') {
            return (
              <Ionicons
                style={(iconName = focused ? styles.iconFocused : styles.icon)}
                name={(iconName = focused ? 'compass' : 'compass-outline')}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <MaterialIcons
                style={(iconName = focused ? styles.iconFocused : styles.icon)}
                name="account-circle"
              />
            );
          } else if (route.name === 'My Books') {
            return (
              <Ionicons
                style={(iconName = focused ? styles.iconFocused : styles.icon)}
                name={(iconName = focused ? 'book' : 'book-outline')}
              />
            );
          } else if (route.name === 'Dashboard') {
            return (
              <MaterialCommunityIcons
                style={(iconName = focused ? styles.iconFocused : styles.icon)}
                name={
                  (iconName = focused
                    ? 'view-dashboard'
                    : 'view-dashboard-outline')
                }
              />
            );
          }
        },
        tabBarActiveTintColor: colorPrimary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.5),
          fontWeight: 'bold',
          letterSpacing: 0.8,
        },
      })}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            dispatch(UpdateShowEditorOptions(false));
            navigation.navigate('Discover');
          },
        })}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      {userData?.userType === 'AUTHOR' || userData.userType === 'ADMIN' ? (
        <Tab.Screen
          name="My Books"
          component={MyBooks}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
  
              // Do something with the `navigation` object
              dispatch(UpdateShowEditorOptions(true));
              navigation.navigate('My Books');
            },
          })}
          options={{
            headerShown: false,
          }}
        />
      ) : null}
      {userData?.userType === 'ADMIN' ? (
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
  
              // Do something with the `navigation` object
              dispatch(UpdateShowEditorOptions(false));
              navigation.navigate('Dashboard');
            },
          })}
          options={{
            headerShown: false,
          }}
        />
      ) : null}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Homepages;

const styles = StyleSheet.create({
  iconFocused: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colorPrimary,
  },
  icon: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
