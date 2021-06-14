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
  TextInput, StatusBar,
  BackHandler
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { responsiveHeight, responsiveWidth } from '../../../../globals/dimensions'
import auth from '@react-native-firebase/auth';
import { CustomActivityIndicator } from "../../../../globals/components/customActivityIndicator/CustomActivityIndicator";
import { CustomToast } from "../../../../globals/components/customToast/CustomToast";
import {
  OutlinedTextField,
} from 'react-native-material-textfield';
import { styles } from './Style';
import { GlobalStyles, Colors } from './../../../../globals/globalStyles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function addProjectsPage({ route, navigation }) {
  const [projectName, setProjectName] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectRate, setProjectRate] = useState('');
  const [projectLanguage, setProjectLanguage] = useState('');
  const projectNameRef = React.createRef();
  const projectRateRef = React.createRef();
  const projectLanguageRef = React.createRef();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [week, setWeek] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var date = moment(new Date());
    setProjectStartDate(new Date())
    setDay(date.format('DD'));
    setWeek(date.format('dddd'));
    setYear(date.format('YYYY'));
    setMonth(date.format('MMMM'));
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    navigation.goBack()
    return true;
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDatePickerVisibility(false);
    setProjectStartDate(moment(date).format('X'))
    setDay(moment(date).format('DD'));
    setWeek(moment(date).format('dddd'));
    setYear(moment(date).format('YYYY'));
    setMonth(moment(date).format('MMMM'));
  };

  const addProject = () => {
    setLoading(true)
    if (projectName !== '' && projectStartDate !== '' && projectRate !== '' && projectLanguage !== '') {
      auth().onAuthStateChanged((user) => {
        if (user != null) {
          firestore().collection('Users/' + user.uid + '/Projects')
            .add({
              projectName: projectName,
              projectStartDate: projectStartDate,
              projectRate: projectRate,
              projectLanguage: projectLanguage
            })
            .then(() => {
              setLoading(false);
              navigation.goBack();
            }).catch((e) => {
              setLoading(false)
            })
        }
      });
    } else {
      setLoading(false)
      CustomToast("All fields are mandatory")
    }
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
          <Text style={styles.headerText}>Add Projects</Text>
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
            <TouchableOpacity style={{
              width: responsiveWidth(40),
              height: responsiveWidth(40),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: Colors.COLOR_WHITE,
            }}
              onPress={showDatePicker}>
              <View style={{
                padding: responsiveHeight(1),
                backgroundColor: Colors.COLOR_PINK,
                width: responsiveWidth(40),
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: Colors.COLOR_WHITE
                }}>{week}</Text>
              </View>
              <View style={{
                flex: 1,
                width: responsiveWidth(40),
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  color: Colors.COLOR_TEXT
                }}>{day}</Text>
                <Text style={{
                  fontSize: 15,
                  fontWeight: '200',
                  color: Colors.COLOR_TEXT
                }}>{month} {year}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ padding: responsiveWidth(5), backgroundColor: "#fff", flex: 1 }}>
            <OutlinedTextField
              label={"Project Name"}
              ref={projectNameRef}
              onChangeText={(projectName) => {
                setProjectName(projectName)
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
              label={"Project Rate"}
              keyboardType='phone-pad'
              ref={projectRateRef}
              onChangeText={(projectRate) => {
                setProjectRate(projectRate)
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
              label={"Project Language"}
              ref={projectLanguageRef}
              onChangeText={(projectLanguage) => {
                setProjectLanguage(projectLanguage)
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
            <TouchableOpacity style={styles.buttonContainer}
              onPress={addProject}>
              <Text style={styles.buttonText}>Add Project</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
