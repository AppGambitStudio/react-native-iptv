import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import appReducers from '../reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers(appReducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const defaultStore = () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: [logger],
  });
  let persistor = persistStore(store);
  return {store, persistor};
};

export default defaultStore;
