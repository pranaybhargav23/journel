import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import AddEditEntryScreen from '../screens/AddEditEntryScreen';
import EntryDetailScreen from '../screens/EntryDetailScreen';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AppTabs" component={BottomTabNavigation} />
      <Stack.Screen name="AddEditEntry" component={AddEditEntryScreen} />
      <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
    
    </Stack.Navigator>
  )
}

export default StackNavigation

