import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapAndListScreen from '../screens/MapAndListScreen';
import ShopDetailScreen from '../screens/ShopDetailScreen';

const Stack = createNativeStackNavigator();

export default function FinderStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#92400e',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen 
        name="MapAndList" 
        component={MapAndListScreen}
        options={{ title: 'Find Coffee Shops' }}
      />
      <Stack.Screen 
        name="ShopDetail" 
        component={ShopDetailScreen}
        options={{ title: 'Shop Details' }}
      />
    </Stack.Navigator>
  );
}