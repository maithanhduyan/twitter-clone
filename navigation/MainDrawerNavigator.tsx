import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNavigator from './MainTabNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import CommunityScreen from '../screens/CommunityScreen';
import SettingsPrivacyScreen from '../screens/SettingsPrivacyScreen';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Community" component={CommunityScreen} />
      <Drawer.Screen name="SettingsPrivacy" component={SettingsPrivacyScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
