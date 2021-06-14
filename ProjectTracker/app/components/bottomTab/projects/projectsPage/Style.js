import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../../../../globals/dimensions';
import { Colors } from '../../../../globals/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: Colors.APP_COLOR
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
  floatingButtonContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: Colors.APP_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 22,
    right: 30
  },
  itemContainer: {
    padding: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveWidth(5),
    borderRadius: 10,
    backgroundColor: Colors.COLOR_WHITE,
    flexDirection: 'row'
  },
  projectName: {
    fontSize: 18,
    color: Colors.COLOR_TEXT,
    fontWeight: '600'
  },
  totalTime: {
    fontSize: 18,
    color: Colors.COLOR_TEXT,
    fontWeight: 'bold'
  },
  language: {
    fontSize: 16,
    color: Colors.COLOR_TEXT,
    fontWeight: '300',
    marginTop: 8
  }
});
