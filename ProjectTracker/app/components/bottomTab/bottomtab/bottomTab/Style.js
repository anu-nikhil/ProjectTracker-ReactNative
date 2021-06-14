import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../../globals/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_APP_BG1,
    height: Dimensions.get('window').height
  },

});
