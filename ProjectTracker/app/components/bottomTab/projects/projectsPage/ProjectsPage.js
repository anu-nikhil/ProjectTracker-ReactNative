import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  Image,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ImageBackground,
  ScrollView,
  Text,
  StatusBar,
  FlatList,
  BackHandler
} from 'react-native';
import { responsiveHeight } from '../../../../globals/dimensions';
import { styles } from './Style';
import { CustomActivityIndicator } from "../../../../globals/components/customActivityIndicator/CustomActivityIndicator";
import { CustomToast } from "../../../../globals/components/customToast/CustomToast";
import { Colors, GlobalStyles } from '../../../../globals/globalStyles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setUserProjects } from '../../../../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { strings } from '../../../../globals/localisation';

export default function projectsPage({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const userProjects = useSelector(state => state.USERDETAILS.userProjects);
  const dispatch = useDispatch();
  var currentCount = 0;
  // const projects = await firestore().collection('Users').doc('ABC').get();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user != null) {
        firestore()
          .collection('Users/' + user.uid + '/Projects')
          .onSnapshot(documentSnapshot => {
            dispatch(setUserProjects(documentSnapshot.docs))
            setProjects(documentSnapshot.docs)
          })
      }
    })
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.itemContainer, GlobalStyles.addShadow]}
        onPress={() => {
          navigation.navigate('ProjectDetailPage', { id: item.id })
          console.log(item.id);
        }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.projectName}>{item._data.projectName}</Text>
          <Text style={styles.language}>{item._data.projectLanguage + ", " + moment(item._data.projectStartDate, "X").format("DD MMM YYYY")}</Text>
          <Text style={styles.language}>{"Rate: " + item._data.projectRate}</Text>
        </View>
        <Text style={styles.totalTime}>{item._data.totalTime
          ? calculateTime(item._data.totalTime) : 0}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_APP_BG2} translucent barStyle="light-content" />
      <SafeAreaView style={{ marginTop: Platform.OS = 'android' ? StatusBar.currentHeight : 0 }}></SafeAreaView>
      {loading && (<CustomActivityIndicator />)}
      <KeyboardAvoidingView style={[styles.mainContainer, { marginBottom: useBottomTabBarHeight() }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Projects</Text>
        </View>
        {projects.length > 0
          ? <ScrollView style={{}}
            contentContainerStyle={{}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <FlatList
              data={projects}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingVertical: responsiveHeight(2),
                marginBottom: responsiveHeight(10)
              }}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
          : <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={styles.projectName}>Add some projects</Text>
          </View>
        }
        <TouchableOpacity style={[styles.floatingButtonContainer, GlobalStyles.addShadow]}
          onPress={() => {
            navigation.navigate('AddProjectsPage')
          }}>
          <Text style={{
            fontSize: 50,
            color: Colors.COLOR_BLACK
          }}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
