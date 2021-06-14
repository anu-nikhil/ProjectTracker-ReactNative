import React, { useEffect } from 'react';
import {
  Platform,
  View
} from 'react-native';
import { styles } from "./Style";
import SplashScreen from "react-native-splash-screen";

export default function AuthLoadingScreen({ navigation }) {

  useEffect(() => {
    navigation.navigate('LoginScreen')
    setTimeout(() => {
      if (Platform.OS == 'android')
        SplashScreen.hide()
    }, 200);
  }, []);

  // Splash screen background while loading react native code.
  return (
    <View style={styles.container}>
    </View>
  );
}
