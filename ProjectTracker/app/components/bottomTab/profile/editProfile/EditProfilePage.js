import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  StatusBar,
  BackHandler
} from 'react-native';
import { styles } from './Style';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { responsiveHeight, responsiveWidth } from '../../../../globals/dimensions';
import { CustomActivityIndicator } from "../../../../globals/components/customActivityIndicator/CustomActivityIndicator";
import { CustomToast } from "../../../../globals/components/customToast/CustomToast";
import { Colors, GlobalStyles } from '../../../../globals/globalStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setUserProfilePic } from '../../../../store/actions/userActions';
import {
  OutlinedTextField,
} from 'react-native-material-textfield';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { useDispatch, useSelector } from 'react-redux';

export default function editProfilePage({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isProfilePicEdited, setIsProfilePicEdited] = useState(false);
  const firstNameRef = React.createRef();
  const lastNameRef = React.createRef();
  const emailRef = React.createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user != null) {
        setLoading(true);
        setUser(user);
        storage().ref('users/' + user.uid).getDownloadURL().then((url) => {
          setLoading(false);
          setProfilePic(url);
        }).catch(e => {
          setLoading(false);
        });
        setLoading(true);
        firestore()
          .collection('Users')
          .doc(user.uid)
          .onSnapshot(documentSnapshot => {
            setLoading(false);
            setFirstName(documentSnapshot.data().firstName)
            setLastName(documentSnapshot.data().lastName)
            setEmail(documentSnapshot.data().email)
          })
      }
    })
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    navigation.goBack()
    return true;
  };
  const update = async () => {
    setLoading(true)
    if (profilePic != null && isProfilePicEdited) {
      await storage().ref('/users/' + user.uid).putFile(profilePic);
      dispatch(setUserProfilePic(profilePic))
    }
    firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        firstName: firstName,
        lastName: lastName
      })
      .then(() => {
        setLoading(false)
        navigation.goBack()
      }).catch((e) => {
        console.log(e);
        setLoading(false)
      });
  }
  const uploadImage = async () => {
    setIsButtonVisible(true);
    setIsProfilePicEdited(true)
    let options = {
      // title: 'You can choose one image',
      maxWidth: responsiveWidth(30),
      maxHeight: responsiveWidth(30),
      mediaType: 'photo',
      quality: 1,
      cameraType: 'back',
      includeBase64: true
    };

    // uploads file
    launchImageLibrary(options, async response => {
      setLoading(true)
      if (response.didCancel) {
        CustomToast("User cancelled photo picker");
        setLoading(false)
      } else if (response.error) {
        setLoading(false)
        CustomToast("ImagePicker Error: '", response.error);
      } else if (response.customButton) {
        setLoading(false)
        CustomToast("User tapped custom button: ", response.customButton);
      } else {
        setLoading(false)
        setProfilePic(response.assets[0].uri)
      }
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_APP_BG2} translucent barStyle="light-content" />
      <SafeAreaView style={{ marginTop: Platform.OS = 'android' ? StatusBar.currentHeight : 0 }}></SafeAreaView>
      {loading && (<CustomActivityIndicator />)}
      <KeyboardAvoidingView style={[styles.mainContainer, { marginBottom: useBottomTabBarHeight() }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButtonContainer}
            onPress={() => {
              navigation.goBack()
            }}>
            <Image
              source={require('../../../../images/backButton.png')}
              style={GlobalStyles.backButton}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>
        <ScrollView style={{}}
          contentContainerStyle={{}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{
            height: responsiveHeight(30),
            backgroundColor: Colors.COLOR_APP_BG2,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={styles.profileImageContainer}>
              {profilePic !== null
                ? <Image
                  source={{ uri: profilePic }}
                  style={styles.profilePicture}
                />
                : <Image
                  source={require('../../../../images/profileImage.png')}
                  style={styles.profilePic}
                />}
              <TouchableOpacity style={[styles.cameraContainer, GlobalStyles.addShadow]}
                onPress={uploadImage}>
                <Image
                  source={require('../../../../images/camera.png')}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingBottom: 10, flex: 1, paddingTop: 20 }}>
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../../images/name.png')}
                  style={styles.itemIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <OutlinedTextField
                  label={"First Name"}
                  onChangeText={(firstName) => {
                    setFirstName(firstName)
                    setIsButtonVisible(true)
                  }}
                  ref={firstNameRef}
                  labelTextStyle={Colors.COLOR_TEXT}
                  fontSize={16}
                  labelFontSize={15}
                  textColor={Colors.COLOR_TEXT}
                  containerStyle={styles.materialTextContainer}
                  inputContainerStyle={styles.materialTextInnerContainer}
                  tintColor={Colors.COLOR_TEXT}
                  baseColor={Colors.COLOR_TEXT}
                  textColor={Colors.COLOR_TEXT}
                  activeLineWidth={1}
                  returnKeyType='done'
                  defaultValue={firstName}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 10, flex: 1 }}>
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../../images/lastName.png')}
                  style={styles.itemIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <OutlinedTextField
                  label={"Last Name"}
                  onChangeText={(lastName) => {
                    setLastName(lastName);
                    setIsButtonVisible(true);

                  }}
                  ref={lastNameRef}
                  labelTextStyle={Colors.COLOR_TEXT}
                  fontSize={16}
                  labelFontSize={15}
                  textColor={Colors.COLOR_TEXT}
                  containerStyle={styles.materialTextContainer}
                  inputContainerStyle={styles.materialTextInnerContainer}
                  tintColor={Colors.COLOR_TEXT}
                  baseColor={Colors.COLOR_TEXT}
                  textColor={Colors.COLOR_TEXT}
                  activeLineWidth={1}
                  returnKeyType='done'
                  defaultValue={lastName}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 10, flex: 1 }}>
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../../images/email.png')}
                  style={styles.itemIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <OutlinedTextField
                  label={"Email"}
                  onChangeText={(email) => {
                    setEmail(email)
                  }}
                  ref={emailRef}
                  labelTextStyle={Colors.COLOR_TEXT}
                  fontSize={16}
                  labelFontSize={15}
                  textColor={Colors.COLOR_TEXT}
                  containerStyle={styles.materialTextContainer}
                  inputContainerStyle={styles.materialTextInnerContainer}
                  tintColor={Colors.COLOR_TEXT}
                  baseColor={Colors.COLOR_TEXT}
                  textColor={Colors.COLOR_TEXT}
                  activeLineWidth={1}
                  returnKeyType='done'
                  editable={false}
                  defaultValue={email}
                />
              </View>

            </View>
          </View>
          {isButtonVisible &&
            <TouchableOpacity style={styles.buttonContainer}
              onPress={update}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
