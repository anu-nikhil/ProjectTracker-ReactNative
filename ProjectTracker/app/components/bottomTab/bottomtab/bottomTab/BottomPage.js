import React from 'react';
import BottomTabNavigator from '../bottomTab/BottomTab';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from 'react-native';
import { Colors, GlobalStyles } from '../../../../globals/globalStyles'
export default function bottomPage() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.APP_COLOR
    }}>
      <StatusBar backgroundColor={Colors.COLOR_APP_BG2} translucent barStyle="light-content" />
      <View style={{
        flex: 1,
        height: Dimensions.get('window').height
      }}>
        <BottomTabNavigator />
      </View>
    </View>
  );
}
