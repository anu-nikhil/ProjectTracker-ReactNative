import React, { useState, useEffect } from 'react';
import { Platform, ToastAndroid, Alert } from 'react-native';

export const CustomToast = msg => {
    if (Platform.OS == 'ios') {
        Alert.alert(msg)
    } else {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
}