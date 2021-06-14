import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView, SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { styles } from "./Style";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CustomToast } from '../../globals/components/customToast/CustomToast';
import { Colors, GlobalStyles } from '../../globals/globalStyles'
import { OutlinedTextField } from 'react-native-material-textfield';
import { responsiveWidth, responsiveHeight } from '../../globals/dimensions';
import { CustomActivityIndicator } from '../../globals/components/customActivityIndicator/CustomActivityIndicator'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const signup = async () => {
    setLoading(true)

    if (email !== '' && password != '') {
      auth().createUserWithEmailAndPassword(
        email,
        password
      ).then(async (res) => {
        res.user.sendEmailVerification();
        if (profilePic !== null)
          await storage().ref('/users/' + res.user.uid).putFile(profilePic);
        firestore()
          .collection('Users')
          .doc(res.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            email: email
          })
          .then(() => {
            setLoading(false)
            navigation.navigate('LoginScreen');
            CustomToast("User added");
            setEmail('')
            setFirstName('')
            setLastName('')
            setPassword('')
          })
      }).catch(error => {
        setLoading(false)
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          CustomToast("That email address is already in use!");
        }
        if (error.code === 'auth/weak-password') {
          CustomToast("Password should be at least 6 characters ");
        }
        if (error.code === 'auth/invalid-email') {
          CustomToast("That email address is invalid!");
        }
      });
    }
  }

  const uploadImage = async () => {
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

  // Splash screen background while loading react native code.
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_APP_BG2} translucent barStyle="light-content" />
      <SafeAreaView style={{ marginTop: Platform.OS = 'android' ? StatusBar.currentHeight : 0 }}></SafeAreaView>
      {loading && (<CustomActivityIndicator />)}
      <KeyboardAvoidingView style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: responsiveWidth(10),
        justifyContent: 'center',
      }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView style={{}}
          contentContainerStyle={{
            justifyContent: 'center',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 40 }}>
            <View style={styles.profileImageContainer}>
              {profilePic !== null
                ? <Image
                  source={{ uri: profilePic }}
                  style={styles.profilePicture}
                />
                : <Image
                  source={require('../../images/profileImage.png')}
                  style={styles.profilePic}
                />}
              <TouchableOpacity style={[styles.cameraContainer, GlobalStyles.addShadow]}
                onPress={uploadImage}>
                <Image
                  source={require('../../images/camera.png')}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>
            <OutlinedTextField
              label={"Email"}
              onChangeText={(email) => {
                setEmail(email)
              }}
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
              keyboardType='email-address'
            />
            <OutlinedTextField
              label={"Password"}
              onChangeText={(password) => {
                setPassword(password)
              }}
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
              secureTextEntry={true}
            />
            <OutlinedTextField
              label={"First Name"}
              onChangeText={(firstName) => {
                setFirstName(firstName)
              }}
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
            />
            <OutlinedTextField
              label={"Last Name"}
              onChangeText={(lastName) => {
                setLastName(lastName)
              }}
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
            />
          </View>
          <TouchableOpacity style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: Colors.COLOR_APP_BTN,
            alignItems: 'center',
            marginHorizontal: responsiveWidth(10),
            minWidth: responsiveWidth(50)
          }}
            onPress={() => signup()}
          >
            <Text style={{
              color: Colors.COLOR_WHITE,
              fontSize: 20,
              fontWeight: 'bold'
            }}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            padding: 20,
            borderRadius: 5,
            alignSelf: 'center'
          }}
            onPress={() => { navigation.navigate('LoginScreen') }}>
            <Text style={{
              fontSize: 16,
              color: Colors.COLOR_TEXT
            }}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
