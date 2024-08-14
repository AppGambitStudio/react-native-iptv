import React from 'react';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export const drawerScreenOptions = {
  drawerStyle: {
    backgroundColor: 'transparent',
    width: width,
  },
  overlayColor: 'transparent',
  drawerType: 'front',
  headerShown: false,
};

export const appStackHeaderOptions = props => ({
  headerTitleAlign: 'center',
  animation: 'slide_from_right',
});

export const appStackScreenOptions = {
  headerStyle: {backgroundColor: '#1A1924', borderBottomColor: 'white'},
  headerTitleStyle: {color: 'white'},
};
