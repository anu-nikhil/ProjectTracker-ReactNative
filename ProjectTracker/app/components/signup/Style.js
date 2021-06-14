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
  profileImageContainer: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    resizeMode: 'contain',
    borderRadius: responsiveWidth(15),
    backgroundColor: Colors.COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    marginBottom: 20
  },
  profilePic: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    resizeMode: 'contain'
  },
  profilePicture: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    resizeMode: 'stretch',
    borderRadius: responsiveWidth(15),
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
