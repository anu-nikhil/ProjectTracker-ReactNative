/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./app/store/store";
import MainStackNavigator from './app/router/nav'
import {
  StatusBar,
  View,
  Platform
} from 'react-native';
import { Colors } from './app/globals/globalStyles';

function App() {
  return (
    <Provider store={store}>
      {Platform.OS === 'android' && (
        <View style={{}}>
          <StatusBar backgroundColor={Colors.APP_COLOR} barStyle="light-content" />
        </View>
      )}
      {Platform.OS === 'ios' && (
        <View style={{ borderWidth: 2 }}>
          <StatusBar barStyle="light-content" />
        </View>
      )}
      <MainStackNavigator />
    </Provider>
  );
}

export default App;
