import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import AddFormScreen from "../screens/AddFormScreen"
import NewListingButton from "./NewFormButton";
import routes from "./routes";
import useAuth from "../auth/useAuth";
import SearchNavigator from "./SearchNavigator";
// import navigation from "./rootNavigation";
// import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  // useNotifications();
  const { user } = useAuth()

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Feed"}>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search/Add"
        component={SearchNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => { user.userType === "Business" ? navigation.navigate("Search/Add", { screen: routes.ADD_FORM_SCREEN }) : navigation.navigate("Search/Add", { screen: routes.SEARCH }) }}
              name={user.userType === "Business" ? "plus-circle" : "account-search"}

            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
