/**
 * @format
 */
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import defaultStore from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = defaultStore();

const AppRoot = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(AppRoot));
