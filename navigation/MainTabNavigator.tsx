import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Notification from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import Communities from '../screens/CommunitiesScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();



const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Notification':
              iconName = 'notifications-outline';
              break;
            case 'Search':
              iconName = 'search-outline';
              break;
            case 'Communities':
              iconName = 'people-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Communities" component={Communities} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
