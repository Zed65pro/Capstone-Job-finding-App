import React, { useEffect } from "react";
import { Alert, View, FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import { ListItem, ListItemDeleteAction, ListItemSeparator } from "../components/lists";


function FormsScreen({ navigation }) {
  const { user } = useAuth();
  const getListingsApi = useApi(listingsApi.getMyForms);
  const deleteFormApi = useApi(listingsApi.deleteMyForm)

  useEffect(() => {
    getListingsApi.request(user._id);
  }, []);

  const handleDelete = function (item) {
    Alert.alert("Delete a form", "Are you sure that you want to delete this form ?",
      [
        { text: "Cancel", style: "cancel" }, {
          text: "Delete", onPress: async () => {
            try {
              await deleteFormApi.request(item._id)
              await getListingsApi.request(user._id)
            }
            catch (e) {
              console.log(e)
            }
          },
          style: "destructive"
        }], { cancelable: true })
  }

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading || deleteFormApi.loading} />
      <Screen style={styles.screen}>
        {(getListingsApi.error) && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={() => getListingsApi.request(user._id)} />
          </>
        )}
        {(deleteFormApi.error) && (
          <AppText>Couldn't delete the Form.</AppText>
        )}
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing._id}
          renderItem={({ item }) => (
            <>
              <ListItem
                title={item.title}
                subTitle={(item.owner ? item.owner.name : "Some business ") + " offers a " + (item.jobType ? item.jobType : "job ") + " job at " + (item.location ? item.location.city +", "+ item.location.country : "some place")}
                onPress={() => navigation.navigate(routes.FORM_DETAIL, item)}
                renderRightActions={() => <ListItemDeleteAction
                  onPress={
                    () => handleDelete(item)
                  }
                />}
              />
              <ListItemSeparator />
            </>
          )}
        />
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

export default FormsScreen;
