import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import colors from "../config/colors";
import style from "../config/styles";

import Text from "../components/Text";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import * as Linking from 'expo-linking';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import listingsApi from "../api/listings";

import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/Button";

function FormDetailsScreen({ route, navigation }) {
  const [listing, setListing] = useState(route.params)
  const getListingApi = useApi(listingsApi.getForm)
  const deleteFormApi = useApi(listingsApi.deleteMyForm)

  useEffect(() => {
    const data = async () => {
      try {
        const item = await getListingApi.request(route.params._id)
        item.data.value["submitters"] = item.data.submitters
        setListing(item.data.value)
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])

  const handleDelete = function () {

    Alert.alert("Delete a form", "Are you sure that you want to delete this form ?",
      [
        { text: "Cancel", style: "cancel" }, {
          text: "Delete", onPress: async () => {
            try {
              await deleteFormApi.request(listing._id)
              navigation.navigate(routes.MY_FORMS)
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
      <ActivityIndicator visible={getListingApi.loading} />
      < Screen >
        <ScrollView style={styles.detailsContainer}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.title, { marginRight: 10 }]}>{listing.title}</Text>
              <TouchableOpacity style={{ padding: 5, marginRight: 10 }} onPress={() => navigation.navigate(routes.EDIT_FORM, listing)
              }>
                <MaterialCommunityIcons name="pencil" color={colors.primary} size={25} />
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 5, marginRight: 10 }} onPress={handleDelete}>
                <MaterialCommunityIcons name="delete" color={colors.primary} size={25} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text style={styles.date}>Due to {new Date(listing.deadline).toDateString()}</Text>
            </View>
            <ListItemSeparator />
            <Text style={styles.title}>Description</Text>
            <View style={{ paddingLeft: 10 }}>
              <Text style={style.text} >
                {listing.description}
              </Text>
            </View>
            <ListItemSeparator />
            {listing.requirements && listing.requirements.length != 0 && <>
              <Text style={styles.title}>Requirements</Text>
              <View style={{ paddingLeft: 10 }}>
                {listing.requirements.map((s, index) =>
                  <Text style={style.text} key={index}> {"- " + s} </Text>)}
              </View>
            </>
            }
            {listing.requirements && listing.requirements.length != 0 && <ListItemSeparator />}
            {listing.details && <>
              <Text style={styles.title}>More Details</Text>
              <View style={{ paddingLeft: 10 }}>
                {Object.keys(listing.details).map((detail, index) =>
                  <View style={{ flexDirection: "row" }} key={index}>
                    <Text style={[style.text, { fontWeight: "bold" }]}> {detail.charAt(0).toUpperCase() + detail.slice(1) + ": "} </Text>
                    <Text style={style.text}> {listing.details[detail]} </Text>
                  </View>)}
              </View>
            </>
            }
            {listing.details && listing.details.length != 0 && <ListItemSeparator />}

            <Text style={styles.title}>Contact info</Text>
            <View>
              <Text onPress={() => Linking.openURL("tel: " + listing.phone)}>Phone: {listing.phone} </Text>
              <Text onPress={() => Linking.openURL("mailto: " + listing.email)}>Email:  {listing.email} </Text>
            </View>
            <ListItemSeparator />

            <AppButton title={"Submitters " + listing.submitters}
              onPress={() => navigation.navigate(routes.MY_RESPONSES, listing)}
            />

          </KeyboardAvoidingView>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: 20
  },
  image: {
    width: "100%",
    height: 300,
  },
  date: {
    color: colors.danger,
    fontSize: 18,
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 20,
  },
});

export default FormDetailsScreen;
