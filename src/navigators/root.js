import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from '../navigators/AuthStack';

const Stack = createNativeStackNavigator();

const NavigationRoot = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Auth'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoot;
