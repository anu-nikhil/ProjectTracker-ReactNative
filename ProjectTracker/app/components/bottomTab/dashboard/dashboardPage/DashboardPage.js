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
  TouchableHighlight,
  FlatList,
  BackHandler
} from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
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
import { GLOBAL_DATA } from "../../../../globals/globalData";
import { strings } from '../../../../globals/localisation';

export default function dashboardPage({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [stopwatchReset, setStopwatchReset] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [fromBackground, setFromBackground] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [projectSelected, setProjectSelected] = useState(null);
  const [timeslotId, setTimeslotId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [startTimer, setStartTimer] = useState(0);
  const stopwatchRef = React.createRef();
  var currentCount = 0;

  useEffect(() => {
    var user = auth().currentUser;
    if (user !== null) {
      setUser(user)
      firestore()
        .collection('Users/' + user.uid + '/Projects')
        .onSnapshot(documentSnapshot => {
          console.log(documentSnapshot);
          setProjects(documentSnapshot._docs)
        })
    }
    GLOBAL_DATA._retrieveDataFromAsyncStorage("selectedProjectId").then((res1) => {
      if (res1 !== null) {
        auth().onAuthStateChanged((user) => {
          checkTimeslot(user)
        })

      } else {

      }
    })

    // Adding listener for handling device back button.
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const checkTimeslot = (user) => {
    GLOBAL_DATA._retrieveDataFromAsyncStorage("selectedProjectId").then((res1) => {
      console.log("async data", res1);
      if (res1 !== null) {
        firestore()
          .collection('Users/' + user.uid + '/Projects')
          .doc(res1).get().then(currentProject => {
            if (currentProject._data.isTimerOn) {
              setSelectedProjectId(res1)
              setProjectSelected(currentProject)
              setHeaderText(currentProject._data.projectName)
              GLOBAL_DATA._retrieveDataFromAsyncStorage("timeslotId").then((res2) => {
                if (res2 !== null) {
                  console.log("timeslot ", res2);
                  setTimeslotId(res2)
                  firestore()
                    .collection('Users/' + user.uid + '/Projects/' + res1 + '/Timeslots')
                    .doc(res2).get().then(currentTimeslot => {
                      var currentTime = moment(new Date()).format('X')
                      var timeDiff = currentTime - currentTimeslot._data.startTime
                      setStopwatchStart(true)
                      console.log("extra time", timeDiff * 1000);
                      setStartTimer(timeDiff)
                      console.log("setting true");
                      setFromBackground(true)
                    })
                } else {
                  console.log("timeslotId id is null")
                }
              })
            } else {
              console.log("timer is off");
            }
          })
      } else {
        console.log("selected project id is null")
      }
    })
  }

  const toggleStopwatch = async () => {
    console.log("setting false");
    setFromBackground(false)
    setStopwatchStart(!stopwatchStart)
    setStopwatchReset(false)
    if (stopwatchStart) {
      //stop
      setStartTimer(0)
      setStopwatchReset(true)
      GLOBAL_DATA._retrieveDataFromAsyncStorage("selectedProjectId").then((res1) => {
        if (res1 !== null) {
          setSelectedProjectId(res1)
          GLOBAL_DATA._retrieveDataFromAsyncStorage("timeslotId").then((res2) => {
            if (res2 !== null) {
              setTimeslotId(res2)
              firestore().collection('Users/' + user.uid + '/Projects/' + res1 + '/Timeslots')
                .doc(res2)
                .update({
                  endTime: moment(new Date()).format('X'),
                }).then(() => {
                  setLoading(false);
                  firestore()
                    .collection('Users/' + user.uid + '/Projects/' + res1 + '/Timeslots')
                    .doc(res2).get().then(currentTimeslot => {
                      var time = currentTimeslot._data.endTime - currentTimeslot._data.startTime
                      firestore()
                        .collection('Users/' + user.uid + '/Projects')
                        .doc(res1).get().then(currentProject => {
                          var totalTime = currentProject._data.totalTime
                            ? time + currentProject._data.totalTime
                            : time
                          firestore().collection('Users/' + user.uid + '/Projects')
                            .doc(res1)
                            .update({
                              totalTime: totalTime
                            }).then(() => {
                              console.log("done");
                              setLoading(false);
                            }).catch((e) => {
                              setLoading(false)
                            })
                        })
                    });
                }).catch((e) => {
                  setLoading(false)
                })
            }
          })
        }
      })

      firestore().collection('Users/' + user.uid + '/Projects')
        .doc(projectSelected.id)
        .update({
          isTimerOn: false
        }).then(() => {
          setLoading(false);
        }).catch((e) => {
          setLoading(false)
        })
    } else {
      //start
      console.log("start actions");
      firestore().collection('Users/' + user.uid + '/Projects')
        .doc(projectSelected.id)
        .update({
          isTimerOn: true
        }).then(() => {
          setLoading(false);
        }).catch((e) => {
          setLoading(false)
        })
      firestore().collection('Users/' + user.uid + '/Projects/' + projectSelected.id + '/Timeslots')
        .add({
          startTime: moment(new Date()).format('X'),
        })
        .then((documentReference) => {
          let firestore = documentReference._documentPath._parts
          var timeslotId = firestore[documentReference._documentPath._parts.length - 1];
          GLOBAL_DATA._storeDataInAsyncStorage("selectedProjectId", projectSelected.id)
          GLOBAL_DATA._storeDataInAsyncStorage("timeslotId", timeslotId)
          setLoading(false);
        }).catch((e) => {
          setLoading(false)
        })

      // GLOBAL_DATA._storeDataInAsyncStorage("projectId", projectSelected.id)
    }
  }

  const resetStopwatch = () => {
    setStopwatchStart(false)
    setStopwatchReset(true)
  }

  const options = {
    container: {
      backgroundColor: '#fff',
      padding: 5,
      width: 200,
      alignItems: 'center'
    },
    text: {
      fontSize: 40,
      color: '#000',
      fontWeight: 'bold'
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.listItem}
        onPress={() => {
          setIsCollapsed(!isCollapsed)
          setHeaderText(item._data.projectName)
          setProjectSelected(item)
        }}>
        <Text style={styles.projectName}>{item._data.projectName}</Text>
      </TouchableOpacity>)
  }

  // Back actions.
  const backAction = () => {
    if (currentCount < 1) {
      currentCount += 1;
      CustomToast("Press again to close!")
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


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_APP_BG2} translucent barStyle="light-content" />
      <SafeAreaView style={{ marginTop: Platform.OS = 'android' ? StatusBar.currentHeight : 0 }}></SafeAreaView>
      {loading && (<CustomActivityIndicator />)}
      <KeyboardAvoidingView style={[styles.mainContainer, { marginBottom: useBottomTabBarHeight() }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Time Tracker</Text>
        </View>
        <View style={styles.innerContainer}>
          {projects.length > 0 ?
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={[styles.listHeader, GlobalStyles.addShadow]}
                disabled={stopwatchStart ? true : false}
                onPress={() => {
                  setIsCollapsed(!isCollapsed)
                }}>
                <Text style={styles.sectionHead}>{headerText == '' ? "Select any project" : headerText}</Text>
              </TouchableOpacity>
              {!isCollapsed &&
                <View style={[{
                  backgroundColor: Colors.COLOR_WHITE,
                  marginTop: 10
                }]}>
                  <FlatList
                    data={projects}
                    renderItem={renderItem}
                    contentContainerStyle={GlobalStyles.addShadow}
                    style={[{
                    }]}
                    keyExtractor={(item) => item.id}
                  />
                </View>}
            </View>
            : <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={styles.projectName2}>Add some projects</Text></View>}

          {headerText !== '' && isCollapsed &&
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: responsiveHeight(4)
            }}>
              {(startTimer !== 0 && fromBackground) && <Text style={styles.subText}>Timer was running in the background for {calculateTime(startTimer)}</Text>}
              <View style={[styles.stopWatchContainer, GlobalStyles.addShadow]}>
                <Stopwatch
                  // startTime={startTimer}
                  start={stopwatchStart}
                  laps={true}
                  reset={stopwatchReset}
                  options={options}
                  getTimeOnStop={(re) => {
                  }}
                />
                <TouchableOpacity style={[styles.restartContainer, GlobalStyles.addShadow]}
                  disabled={stopwatchStart ? true : false}
                  onPress={resetStopwatch}>
                  <Image
                    source={require('../../../../images/retry.png')}
                    style={styles.retryButton}
                  />
                </TouchableOpacity>
              </View>
            </View>}
          {headerText !== '' && isCollapsed &&
            <TouchableOpacity style={styles.buttonContainer}
              onPress={toggleStopwatch}>
              <Text style={styles.buttonText}>{!stopwatchStart ? "Start" : "Stop"}</Text>
            </TouchableOpacity>
          }
        </View>
      </KeyboardAvoidingView>

    </View>
  );
}
