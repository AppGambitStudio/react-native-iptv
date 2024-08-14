/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import RootNavigator from './src/navigators/root';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A1924" barStyle={'light-content'} />
      <RootNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
});

export default App;
