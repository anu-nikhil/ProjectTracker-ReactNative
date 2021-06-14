import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { styles } from "./Style";
import auth from '@react-native-firebase/auth';
import { CustomToast } from '../../globals/components/customToast/CustomToast';
import { Colors } from '../../globals/globalStyles'
import { OutlinedTextField } from 'react-native-material-textfield';
import { responsiveWidth, responsiveHeight } from '../../globals/dimensions';
import { CustomActivityIndicator } from '../../globals/components/customActivityIndicator/CustomActivityIndicator'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true)
    if (email !== '' && password !== '') {
      auth().signInWithEmailAndPassword(
        email,
        password
      ).then((res) => {
        console.log(res.user);
        if (res.user.emailVerified) {
          setLoading(false)
          navigation.navigate('BottomPage', {
            userExist: false,
            userData: res.user
          })
        } else {
          setLoading(false)
          CustomToast("Email is not verified")
        }
      }).catch((error) => {
        console.log(error.code);
        setLoading(false)
        if (error.code === 'auth/user-not-found]') {
          CustomToast("User not found")
        } else if (error.code == 'auth/wrong-password') {
          CustomToast("Wrong password")
        } else if (error.code === 'auth/user-not-found') {
          CustomToast("User not found");
        } else {
          CustomToast("Something went wrong!")
        }
      })
    } else {
      setLoading(false)
    }
  }

  // Splash screen background while loading react native code.
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_APP_BG2} translucent barStyle="light-content" />
      <SafeAreaView style={{}}></SafeAreaView>
      {loading && (
        <CustomActivityIndicator />
      )}
      <KeyboardAvoidingView style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{
          backgroundColor: "#fff",
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: responsiveWidth(10)
        }}>
          <OutlinedTextField
            label={"Email"}
            onChangeText={(email) => {
              setEmail(email)
            }}
            keyboardType='email-address'
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
          <TouchableOpacity style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: Colors.COLOR_APP_BTN,
            alignItems: 'center',
            marginHorizontal: responsiveWidth(10),
            minWidth: responsiveWidth(50)
          }}
            onPress={login}>
            <Text style={{
              color: Colors.COLOR_WHITE,
              fontSize: 20,
              fontWeight: 'bold'
            }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            padding: 20,
            borderRadius: 5
          }}
            onPress={() => { navigation.navigate('SignupScreen') }}>
            <Text style={{
              fontSize: 16,
              color: Colors.COLOR_TEXT
            }}>Don't have an account? Signup</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
