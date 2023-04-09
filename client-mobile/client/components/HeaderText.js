import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "./Text";
import { TouchableOpacity } from "react-native-gesture-handler";
function HeaderText({ icon, width = "100%", onPress, style, ...otherProps }) {
    return (
        <View style={[styles.container, { width }, style]} onPress={onPress}>
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={defaultStyles.colors.medium}
                    style={styles.icon}
                />
            )}
            <AppText
                style={defaultStyles.text}
                {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
});
export default HeaderText;