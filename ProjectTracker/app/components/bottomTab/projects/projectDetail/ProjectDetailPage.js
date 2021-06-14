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
import { responsiveHeight, responsiveWidth } from '../../../../globals/dimensions';
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

export default function projectDetailPage({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const userProjects = useSelector(state => state.USERDETAILS.userProjects);
  const dispatch = useDispatch();
  // const projects = await firestore().collection('Users').doc('ABC').get();

  useEffect(() => {
    var user = auth().currentUser;
    firestore()
      .collection('Users/' + user.uid + '/Projects/' + route.params.id + '/Timeslots')
      .get().then((res) => {
        setTimeslots(res._docs.sort(compare))
      })
    if (user != null) {
      firestore()
        .collection('Users/' + user.uid + '/Projects')
        .onSnapshot(documentSnapshot => {
          dispatch(setUserProjects(documentSnapshot.docs))
          setProjects(documentSnapshot.docs)
        })
    }
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    navigation.goBack()
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
      <TouchableOpacity style={[styles.itemContainer, GlobalStyles.addShadow]}>
        <View style={{ flex: 1, }}>
          <Text style={styles.projectName}>{moment(item._data.startTime, "X").format("DD MMM YYYY")}</Text>
          <Text style={styles.language}>
            {moment(item._data.startTime, "X").format("hh:mm:ss a") + " - " +
              moment(item._data.endTime, "X").format("hh:mm:ss a")}</Text>
        </View>
        <Text style={styles.totalTime}>{
          calculateTime(item._data.endTime - item._data.startTime)}</Text>
      </TouchableOpacity>
    )
  }
  function compare(a, b) {
    if (a._data.endTime > b._data.endTime) {
      return -1;
    }
    if (a._data.endTime < b._data.endTime) {
      return 1;
    }
    return 0;
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
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../../images/backButton.png')}
              style={GlobalStyles.backButton}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Timelogs</Text>
        </View>
        {timeslots.length > 0
          ? <ScrollView style={{}}
            contentContainerStyle={{}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <FlatList
              data={timeslots}
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
            <Text style={styles.projectName}>Add some timelogs</Text>
          </View>
        }
      </KeyboardAvoidingView>
    </View>
  );
}
