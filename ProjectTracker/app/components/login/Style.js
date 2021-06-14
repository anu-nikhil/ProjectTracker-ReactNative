import { StyleSheet } from 'react-native';
import { Colors } from '../../globals/globalStyles';
import { responsiveHeight, responsiveWidth } from '../../globals/dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_COLOR
  },
  materialTextContainer: {
    height: responsiveHeight(7),
    marginBottom: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  materialTextInnerContainer: {
    height: responsiveHeight(7),
  },
});
