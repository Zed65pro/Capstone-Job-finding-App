import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import FormsScreen from "../screens/FormsScreen";
import ResponsesScreen from "../screens/ResponsesScreen";
import ResponseDetailsScreen from "../screens/ResponseDetailsScreen";
import FormDetailsScreen from "../screens/FormDetailsScreen";
import EditFormScreen from "../screens/EditFormScreen";
import ProfileScreen from "../screens/ProfileScreen"
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen"
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import PhonesScreen from "../screens/PhonesScreen";
import PreviousJobsScreen from "../screens/PreviousJobsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="My Forms" component={FormsScreen} />
    <Stack.Screen name="My Responses" component={ResponsesScreen} />
    <Stack.Screen name="Response Details" component={ResponseDetailsScreen} />
    <Stack.Screen name="Form Details" component={FormDetailsScreen} />
    <Stack.Screen name="Edit Form" component={EditFormScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={ProfileSettingsScreen} />
    <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    <Stack.Screen name="Change phones" component={PhonesScreen} />
    <Stack.Screen name="Previous Jobs" component={PreviousJobsScreen} />

  </Stack.Navigator>
);

export default AccountNavigator;
