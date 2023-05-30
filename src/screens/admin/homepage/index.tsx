import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colorPrimary} from '../../../assests/Styles/GlobalTheme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Profile from '../common/Profile';
import Discover from '../discover/index';
import {useDispatch} from 'react-redux';
import {UpdateShowEditorOptions} from '../../redux/reducers/commonReducer';

const Tab = createBottomTabNavigator();

const Homepages = () => {
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
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
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
