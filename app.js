import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import QRScanScreen from './src/screens/QRScanScreen';
import RecordDetailScreen from './src/screens/RecordDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="QRScan" component={QRScanScreen} />
        <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}