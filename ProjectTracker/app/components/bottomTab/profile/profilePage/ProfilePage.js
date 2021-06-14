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
import { GLOBAL_DATA } from '../../../../globals/globalData';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { logOut } from '../../../../store/actions/userActions';
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { strings } from '../../../../globals/localisation';
import { useFocusEffect } from '@react-navigation/native';

export default function profilePage({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [projects, setProjects] = useState([]);
  const userProfilePic = useSelector(state => state.USERDETAILS.profilePic);
  const dispatch = useDispatch();
  var currentCount = 0;
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );
  useEffect(() => {
    // Adding listener for handling device back button.
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);


  // Back actions.
  const backAction = () => {
    if (currentCount < 1) {
      currentCount += 1;
      CustomToast(strings.pressAgain)
    } else {
      // Exit the app here.
      BackHandler.exitApp()
    }
    setTimeout(() => {
      currentCount = 0
    }, 2000);
    return true;
  };


  const getData = () => {
    var totalHours = 0;
    setLoading(true)
    auth().onAuthStateChanged((user) => {
      if (user != null) {
        firestore()
          .collection('Users')
          .doc(user.uid)
          .onSnapshot(documentSnapshot => {
            setUser(documentSnapshot.data())
            setLoading(false);
          })
        firestore()
          .collection('Users/' + user.uid + '/Projects')
          .onSnapshot(documentSnapshot => {
            documentSnapshot.docs.map((item) => {
              if (item._data.totalTime != undefined) {
                totalHours = totalHours + item._data.totalTime
                setTotalTime(totalHours)
              }
            })
            setProjects(documentSnapshot.docs)
          })
      }
    })

  }

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        storage().ref('users/' + user.uid).getDownloadURL().then((url) => {
          setLoading(false);
          setProfilePic(url);
        }).catch(e => {
          setLoading(false);
        });
      }
    })
  }, userProfilePic);

  const calculateTime = (second) => {
    const sec = parseInt(second, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    var h = hours != 0 ? hours + 'hr: ' : ""
    var m = minutes != 0 ? minutes + 'min: ' : ""
    var s = seconds != 0 ? seconds + 's ' : ""
    return h + '' + m + "" + s;
  }

  const logout = () => {
    dispatch(logOut())
    GLOBAL_DATA._removeDataFromAsyncStorage("selectedProjectId")
    GLOBAL_DATA._removeDataFromAsyncStorage("timeslotId")
    auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      });
    console.log("logout");
    CustomToast(strings.logoutMessage)
    console.log("loggg222");
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_APP_BG2} translucent barStyle="light-content" />
      <SafeAreaView style={{ marginTop: Platform.OS = 'android' ? StatusBar.currentHeight : 0 }}></SafeAreaView>
      {loading && (<CustomActivityIndicator />)}
      <KeyboardAvoidingView style={[styles.mainContainer, { marginBottom: useBottomTabBarHeight() }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.editContainer}
            onPress={() => { navigation.navigate('EditProfilePage') }}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Profile</Text>
          <TouchableOpacity style={styles.logoutContainer}
            onPress={logout}>
            <Text style={styles.editText}>Logout</Text>
          </TouchableOpacity>
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
                <Text style={styles.headingText}>First Name</Text>
                <Text style={styles.itemText}>{user && user.firstName}</Text>
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
                <Text style={styles.headingText}>Last Name</Text>
                <Text style={styles.itemText}>{user && user.lastName}</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 10, flex: 1 }}>
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../../images/clock.png')}
                  style={styles.itemIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.headingText}>Total Hours Spent</Text>
                <Text style={styles.itemText}>{calculateTime(totalTime)}</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 10, flex: 1 }}>
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../../images/hand.png')}
                  style={styles.itemIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.headingText}>Total Money Earned</Text>
                <Text style={styles.itemText}>{totalTime}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
