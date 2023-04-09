import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import { ErrorMessage } from "../components/forms";
import placeholders from "../config/placeholders";


function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [logoutFailed, setlogoutFailed] = useState(false)

  const menuItems = [
    {
      title: user.userType === "Business" ? "My Forms" : "My Responses",
      icon: {
        name: "format-list-bulleted",
        backgroundColor: colors.primary,
      },
      targetScreen: user.userType === "Business" ? routes.MY_FORMS : routes.MY_RESPONSES,
    },
    {
      title: "Settings",
      icon: {
        name: "account-settings",
        backgroundColor: colors.secondary,
      },
      targetScreen: routes.PROFILE_SETTINGS,
    },
  ];
  return (
    <Screen style={styles.screen}>
      <ErrorMessage
        error="An error occured. Please try again later."
        visible={logoutFailed}
      />
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={user.image ? "data:image/png;base64," + user.image : placeholders.profile_placeholder}
          onPress={() => user.email && navigation.navigate(routes.PROFILE, { _id: user._id })}
        />
      </View>
      {user.email &&
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
          />
        </View>}
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={async () => {
          if (user.email) {
            const result = await authApi.logout();
            if (!result.ok) return setlogoutFailed(true)
          }
          setlogoutFailed(false)
          logOut()
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
