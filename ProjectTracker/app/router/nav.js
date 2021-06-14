import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TutorialScreen from '../components/tutorial/TutorialScreen';
import LoginScreen from '../components/login/LoginScreen';
import SignupScreen from '../components/signup/SignupScreen';
import AuthLoadingScreen from '../components/authLoading/AuthLoadingScreen';
import BottomPage from '../components/bottomTab/bottomtab/bottomTab/BottomPage';

const LoginStack = createStackNavigator();
function LoginStackNavigator() {
  return (
    <LoginStack.Navigator initialRouteName="AuthLoadingScreen" headerMode="none">
      <LoginStack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen name="SignupScreen" component={SignupScreen} />
      <LoginStack.Screen name="BottomPage" component={BottomPage} options={{
        gestureEnabled: false,
      }} />
    </LoginStack.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
}

export default MainStackNavigator;