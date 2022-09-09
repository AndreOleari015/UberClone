import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../Screens/Home';
import { Checkout } from '../Screens/Checkout';
import { Tracking } from '../Screens/Tracking';


const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout} />
        <Stack.Screen
          name="Tracking"
          component={Tracking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}