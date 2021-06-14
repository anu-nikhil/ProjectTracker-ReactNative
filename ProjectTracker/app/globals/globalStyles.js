import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from './dimensions';
export const Colors = {
  COLOR_WHITE: '#fff',
  COLOR_BLACK: '#000',
  // APP_COLOR: 'rgba(23, 36, 62, 0.95)',
  APP_COLOR: '#078282FF',
  COLOR_APP_BTN: '#078282FF',
  COLOR_APP_BG1: '#03b898',
  COLOR_APP_BG2: '#03b898',
  // COLOR_APP_BTN: '#F37F1F',
  // COLOR_APP_BG1: '#17243E',
  // COLOR_APP_BG2: '#2E4470',
  COLOR_PINK: "#078282FF",
  COLOR_TEXT: "#4A4A4A"
};
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const GlobalStyles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  statusBarHeight: {
    marginTop: STATUSBAR_HEIGHT,
  },
  addShadow: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: Colors.COLOR_SHADOW_GREY,
        shadowOpacity: 0.5,
      },
      android: {
        zIndex: 99999,
        elevation: 1,
      },
    }),
  },
  addShadowTop: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowColor: Colors.COLOR_GREY,
        shadowOpacity: 0.6,
      },
      android: {
        zIndex: 8,
        elevation: -4,
      },
    }),
  },
  tabBarIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  backButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  safeArea: { backgroundColor: "#FFF" },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(7, 130, 130, 0.1)',
    zIndex: 9999,
    elevation: 3
  }
});
