import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../../globals/globalStyles';
import { responsiveHeight, responsiveWidth } from '../../../../globals/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_COLOR
  },
  innerContainer: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    width: Dimensions.get('window').width,
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
  buttonText: {
    color: Colors.COLOR_WHITE,
    fontSize: 20,
    fontWeight: 'bold'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE
  },
  headerContainer: {
    height: '8%',
    width: '100%',
    backgroundColor: Colors.APP_COLOR,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: 20,
    padding: 10
  },
  headerText: {
    color: "#000",
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.COLOR_APP_BTN,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(10)
  }
});
