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
  buttonContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.COLOR_APP_BTN,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(10),
    minWidth: responsiveWidth(70),
    position: 'absolute',
    bottom: responsiveHeight(5)
  },
  buttonText: {
    color: Colors.COLOR_WHITE,
    fontSize: 20,
    fontWeight: 'bold'
  },
  stopWatchContainer: {
    width: responsiveWidth(70),
    height: responsiveWidth(70),
    backgroundColor: Colors.COLOR_WHITE,
    borderWidth: 4, borderColor: Colors.APP_COLOR,
    borderRadius: responsiveWidth(45),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(3)
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: "center",
  },
  restartContainer: {
    alignItems: 'center',
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(15),
    justifyContent: 'center',
    borderColor: Colors.APP_COLOR,
    borderWidth: 2,
    position: 'absolute',
    bottom: responsiveHeight(1),
    backgroundColor: Colors.COLOR_WHITE
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#dd0000",
    borderRadius: 5
  },
  collapsibleItem: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#000",
    padding: 10,
    borderWidth: 2
  },
  listHeader: {
    width: responsiveWidth(80),
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(5),
    backgroundColor: Colors.COLOR_WHITE,
    borderRadius: 10
  },
  accordianStyle: {
    marginTop: responsiveHeight(3)
  },
  listItem: {
    width: responsiveWidth(80),
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(3),
    borderBottomColor: Colors.COLOR_TEXT,
    borderBottomWidth: 1,
    borderWidth: 1, borderColor: Colors.COLOR_TEXT,
    marginTop: 2,
    backgroundColor: Colors.COLOR_WHITE
  },
  projectName: {
    fontSize: 16,
    color: Colors.COLOR_TEXT,
    fontWeight: '500'
  },
  projectName2: {
    fontSize: 18,
    color: Colors.COLOR_TEXT,
    fontWeight: '600'
  },
  sectionHead: {
    fontSize: 20,
    color: Colors.COLOR_TEXT,
    fontWeight: '500'
  },
  retryButton: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  subText: {
    fontWeight: '200',
    color: Colors.text,
    fontSize: 15,
    textAlign: 'center'
  }
});
