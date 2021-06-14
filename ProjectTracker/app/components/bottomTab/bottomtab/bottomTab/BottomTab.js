import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors, GlobalStyles } from '../../../../globals/globalStyles';
import DashboardPage from '../../dashboard/dashboardPage/DashboardPage';
import ProjectsPage from '../../projects/projectsPage/ProjectsPage';
import TimesheetPage from '../../timesheet/timesheetPage/TimesheetPage';
import ProfilePage from '../../profile/profilePage/ProfilePage';
import EditProfilePage from '../../profile/editProfile/EditProfilePage';
import AddProjectsPage from '../../projects/addProjectsPage/AddProjectsPage';
import ProjectDetailPage from '../../projects/projectDetail/ProjectDetailPage';
const BottomTab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();
const TimesheetStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ProjectStack = createStackNavigator();
const imageUrl = (type) => {
    switch (type) {
        case "dashboard":
            return require('../../../../images/bottom-tab/dashboard1.png');
        case "dashboard-focused":
            return require('../../../../images/bottom-tab/dashboard2.png');
        case "projects":
            return require('../../../../images/bottom-tab/project1.png');
        case "projects-focused":
            return require('../../../../images/bottom-tab/project2.png');
        case "timesheet":
            return require('../../../../images/bottom-tab/timesheet1.png');
        case "timesheet-focused":
            return require('../../../../images/bottom-tab/timesheet2.png');
        case "profile":
            return require('../../../../images/bottom-tab/profile1.png');
        case "profile-focused":
            return require('../../../../images/bottom-tab/profile2.png');
        default:
            return null;
    }
}
function BottomTabBarIcon({ type }) {
    return (
        <Image
            source={imageUrl(type)}
            style={GlobalStyles.tabBarIcon} />
    );
}
export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="DashboardPage"
            lazy={true}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: "#000",
                inactiveTintColor: "#000",
                labelPosition: 'below-icon',
                tabStyle: {
                    paddingVertical: 4
                },
                style: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    backgroundColor: 'rgba(7,130,130,0.9)',
                },
            }}>
            <BottomTab.Screen name="DashboardPage" component={DashboardStackNavigator}
                backBehaviour="initialRoute"
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarVisible: true,
                    tabBarIcon: ({ color, type, focused }) => (
                        <BottomTabBarIcon
                            type={focused ? 'dashboard-focused' : 'dashboard'} />
                    )
                }} />
            <BottomTab.Screen name="ProjectPage" component={ProjectsStackNavigator}
                backBehaviour="initialRoute"
                options={{
                    tabBarLabel: 'Project',
                    tabBarVisible: true,
                    tabBarIcon: ({ color, type, focused }) => (
                        <BottomTabBarIcon
                            type={focused ? 'projects-focused' : 'projects'} />
                    )
                }} />
            <BottomTab.Screen name="TimesheetPage" component={TimesheetStackNavigator}
                backBehaviour="initialRoute"
                options={{
                    tabBarLabel: 'Timesheet',
                    tabBarVisible: true,
                    tabBarIcon: ({ color, type, focused }) => (
                        <BottomTabBarIcon
                            type={focused ? 'timesheet-focused' : 'timesheet'} />
                    )
                }} />
            <BottomTab.Screen name="ProfilePage" component={ProfileStackNavigator}
                backBehaviour="initialRoute"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarVisible: true,
                    tabBarIcon: ({ color, type, focused }) => (
                        <BottomTabBarIcon
                            type={focused ? 'profile-focused' : 'profile'} />
                    )
                }} />
        </BottomTab.Navigator>
    )
}
function DashboardStackNavigator() {
    return (
        <DashboardStack.Navigator initialRouteName="DashboardPage" headerMode="none" >
            <DashboardStack.Screen name="DashboardPage" component={DashboardPage} />
        </DashboardStack.Navigator>
    );
}
function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator initialRouteName="ProfilePage" headerMode="none" >
            <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
            <ProfileStack.Screen name="EditProfilePage" component={EditProfilePage} />
        </ProfileStack.Navigator>
    );
}
function ProjectsStackNavigator() {
    return (
        <ProjectStack.Navigator initialRouteName="ProjectsPage" headerMode="none" >
            <ProjectStack.Screen name="ProjectsPage" component={ProjectsPage} />
            <ProjectStack.Screen name="ProjectDetailPage" component={ProjectDetailPage} />
            <ProjectStack.Screen name="AddProjectsPage" component={AddProjectsPage} />
        </ProjectStack.Navigator>
    );
}
function TimesheetStackNavigator() {
    return (
        <TimesheetStack.Navigator initialRouteName="TimesheetPage" headerMode="none" >
            <TimesheetStack.Screen name="TimesheetPage" component={TimesheetPage} />
        </TimesheetStack.Navigator>
    );
}

