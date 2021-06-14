import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import { styles } from "./Style";

export default function TutorialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
    </View>
  );
}
