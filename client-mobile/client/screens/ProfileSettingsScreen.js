import React from 'react';
import { FlatList, View, StyleSheet } from "react-native";
import Icon from '../components/Icon';
import { ListItem, ListItemSeparator } from '../components/lists';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';

function ProfileSettingsScreen({ navigation, route }) {
    const menuItems = [
        {
            title: "Edit profile",
            icon: {
                name: "format-list-bulleted",
                backgroundColor: colors.primary,
            },
            targetScreen: routes.EDIT_PROFILE,
        },
        {
            title: "Security",
            icon: {
                name: "security",
                backgroundColor: colors.secondary,
            },
            targetScreen: routes.SECURITY,
        },
        {
            title: "Contact",
            icon: {
                name: "account-supervisor",
                backgroundColor: "#61b0b7",
            },
            targetScreen: routes.CONTACT,
        },
        {
            title: "Previous Jobs",
            icon: {
                name: "briefcase-clock",
                backgroundColor: colors.medium,
            },
            targetScreen: routes.PREVIOUS_JOBS,
        },
    ];
    return (
        <Screen>
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
            </View>
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

export default ProfileSettingsScreen;