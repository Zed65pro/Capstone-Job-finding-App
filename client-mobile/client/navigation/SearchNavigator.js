import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddFormScreen from "../screens/AddFormScreen";
import SearchScreen from "../screens/SearchScreen"

const Stack = createStackNavigator();

const SearchNavigator = () => (
    <Stack.Navigator initialRouteName="Search" presentation="modal" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Add Form Screen" component={AddFormScreen} />
    </Stack.Navigator>
);

export default SearchNavigator;



