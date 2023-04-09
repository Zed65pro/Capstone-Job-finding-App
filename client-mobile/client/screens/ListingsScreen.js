import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import UsersApi from "../api/users"
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import placeholders from "../config/placeholders";
import AppTextInput from "../components/TextInput";
import { TouchableWithoutFeedback } from "react-native";
import useAuth from "../auth/useAuth";


function ListingsScreen({ navigation }) {
  const getUsersApi = useApi(UsersApi.searchUser);
  const getListingsApi = useApi(listingsApi.getListings);
  const { user } = useAuth()

  useEffect(() => {

    if(user.userType === "Business")
      getUsersApi.request("?userType=FreeLancer")
    else
      getListingsApi.request();

  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}


        {user.userType === "Business" &&
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Search/Add", { screen: routes.SEARCH })}>
            <View>
              <AppTextInput editable={false} icon={"account-search"} placeholder={"Search"} />
            </View>
          </TouchableWithoutFeedback>
        }

        {
           user.userType !== "Business" &&
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing._id}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={(item.owner ? item.owner.name : "Some business ") + " offers a " + (item.jobType ? item.jobType : "job ") + " job at " + (item.location ? item.location.city : "some place")}
              imageUrl={item.owner.image ? "data:image/png;base64," + item.owner.image : placeholders.profile_placeholder}
              onPress={() => {
                console.log(item)
                navigation.navigate(routes.LISTING_DETAILS, item)
              }}
            />
          )}
        />
            }

{
                user.userType === "Business" &&
                <FlatList
                    data={getUsersApi.data}
                    keyExtractor={(user) => user._id}
                    renderItem={({ item }) => (
                        <Card
                            title={item.name}
                            subTitle={item.specialization}
                            imageUrl={item.image ? item.image : placeholders.profile_placeholder}
                            onPress={() => navigation.navigate("Account", { screen: routes.PROFILE, params: { _id: item._id } })}
                        />
                    )}
                />

            }
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
