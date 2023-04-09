import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ApplyFormScreen from "../screens/ApplyFormScreen";
import SearchScreen from "../screens/SearchScreen"

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator initialRouteName="Listings" presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="ApplyForm" component={ApplyFormScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
