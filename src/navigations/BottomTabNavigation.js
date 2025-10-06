import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JournalListScreen from '../screens/JournalListScreen';
import SearchFilterScreen from '../screens/SearchFilterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="JournalList"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'JournalList') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'SearchFilter') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="JournalList" component={JournalListScreen}  />
      <Tab.Screen name="SearchFilter" component={SearchFilterScreen}  />
      <Tab.Screen name="Settings" component={SettingsScreen}  />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
