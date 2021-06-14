import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
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
import { useFocusEffect } from '@react-navigation/native';
import { strings } from '../../../../globals/localisation';
import moment from 'moment';

export default function timesheetPage({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [timeslotArray, setTimeslotArray] = useState([])
  var currentCount = 0;

  useFocusEffect(
    React.useCallback(() => {
      var array = timeslotArray
      var array2 = []
      auth().onAuthStateChanged((user) => {
        if (user != null) {
          setUser(user)
          firestore().collection('Users/' + user.uid + '/Projects')
            .get().then((projects) => {
              projects._docs.map((project) => {
                firestore().collection('Users/' + user.uid + '/Projects/' + project.id + '/Timeslots')
                  .get().then((timeslots) => {
                    timeslots._docs.map((time) => {
                      time.projectDetails = project
                    })
                    // array = array.concat(timeslots._docs)
                    array = array.concat(timeslots._docs)
                    array2 = array.sort(compare);
                    setTimeslotArray(array2)

                  })
              })
            })
        }
      })
    }, [])
  );

  useEffect(() => {
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

  function compare(a, b) {
    if (a._data.endTime > b._data.endTime) {
      return -1;
    }
    if (a._data.endTime < b._data.endTime) {
      return 1;
    }
    return 0;
  }

  const renderItem = ({ item }) => {
    return (
      item._data.endTime &&
      <TouchableOpacity style={[styles.itemContainer, GlobalStyles.addShadow]}>
        <View style={{ flex: 1, }}>
          <Text style={styles.itemHeading}>{item.projectDetails._data.projectName}</Text>
          <Text style={styles.itemSubHeading}>{item.projectDetails._data.projectLanguage}</Text>

          <Text style={styles.language}>
            {moment(item._data.startTime, "X").format("hh:mm:ss a") + " - " +
              moment(item._data.endTime, "X").format("hh:mm:ss a")}</Text>
        </View>
        <Text style={styles.projectName}>{moment(item._data.startTime, "X").format("DD MMM YYYY")}</Text>
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
          <Text style={styles.headerText}>Time Sheet</Text>
        </View>
        {timeslotArray.length > 0 ?
          <ScrollView style={{}}
            contentContainerStyle={{}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <FlatList
              data={timeslotArray}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingVertical: responsiveHeight(2),
                marginBottom: responsiveHeight(10)
              }}
              style={{}}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
          : <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={styles.projectName}>You did'nt have logged any timelogs.</Text>
          </View>
        }
      </KeyboardAvoidingView>
    </View>
  );
}
