import { StyleSheet } from 'react-native';
import { Colors } from '../../../../globals/globalStyles';
import {
  Dimensions,
} from 'react-native';
import { responsiveWidth, responsiveHeight } from '../../../../globals/dimensions';

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
    fontWeight: 'bold',
  },
  profileImageContainer: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    resizeMode: 'contain',
    borderRadius: responsiveWidth(15),
    backgroundColor: Colors.COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePic: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    resizeMode: 'contain',
    borderRadius: responsiveWidth(30),
  },
  profilePicture: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(30),
  },
  itemIcon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',

  },
  headingText: {
    fontSize: 14,
    color: Colors.COLOR_TEXT,
    fontWeight: '400'
  },
  itemText: {
    fontSize: 18,
    color: Colors.COLOR_TEXT,
    fontWeight: '500'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 5
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1
  },
  imageContainer: {
    padding: 10, backgroundColor: "#d6d6d6",
    borderRadius: responsiveWidth(10),
    marginRight: 15
  },
  editText: {
    fontSize: 16,
    color: Colors.COLOR_WHITE,
    fontWeight: '400',
    textAlign: 'center',
  },
  editContainer: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    right: 20,
    position: 'absolute',
    padding: 10
  },
  materialTextContainer: {
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center'
  },
  materialTextInnerContainer: {
    height: responsiveHeight(7),
  },
  buttonContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.COLOR_APP_BTN,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(10),
    marginVertical: responsiveHeight(2)
  },
  buttonText: {
    color: Colors.COLOR_WHITE,
    fontSize: 20,
    fontWeight: 'bold'
  },
  cameraIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    margin: 10
  },
  cameraContainer: {
    backgroundColor: "#fff",
    borderRadius: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
