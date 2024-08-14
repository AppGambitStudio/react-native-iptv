import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import VlcView from '../components/VlcView/VlcView';
import {appStackScreenOptions} from '../config/navigationConfig';

const AuthFlow = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <AuthFlow.Navigator
      initialRouteName={'VlcView'}
      screenOptions={{
        ...appStackScreenOptions,
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <AuthFlow.Screen name="VlcView" component={VlcView} />
    </AuthFlow.Navigator>
  );
}
