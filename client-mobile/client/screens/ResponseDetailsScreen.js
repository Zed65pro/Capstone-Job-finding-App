import React from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableOpacity,
    ScrollView
} from "react-native";
import colors from "../config/colors";
import style from "../config/styles";

import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import ApplyForm from "../components/ApplyForm";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../navigation/routes";
import AppButton from "../components/Button";
import placeholders from "../config/placeholders";

function ResponseDetailsScreen({ route, navigation }) {
    const response = route.params;
    const { user } = useAuth();
    return (
        <Screen>
            <ScrollView style={styles.detailsContainer}>

                <Text style={styles.title}>{response.form.title}</Text>
                <View style={{ flexDirection: "row-reverse" }}>
                    <Text style={styles.date}>Submitted on {new Date(response.createdAt).toDateString()}</Text>
                </View>
                <ListItemSeparator />
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="account" size={25} color={colors.dark} />
                    <Text style={styles.title}>Name</Text>
                </View>
                <Text style={style.text} >
                    {response.name}
                </Text>
                <ListItemSeparator />
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="email" size={25} color={colors.dark} />
                    <Text style={styles.title}>Email</Text>
                </View>
                <Text style={style.text} >
                    {response.email}
                </Text>
                <ListItemSeparator />
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="gender-male-female" size={25} color={colors.dark} />
                    <Text style={styles.title}>Gender</Text>
                </View>
                <Text style={style.text} >
                    {response.gender}
                </Text>
                <ListItemSeparator />

                <ListItemSeparator />
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="office-building" size={25} color={colors.dark} />
                    <Text style={styles.title}>Profession</Text>
                </View>
                <Text style={style.text} >
                    {response.specialization}
                </Text>
                <ListItemSeparator />
                {
                    response.location && <>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons name="earth" size={25} color={colors.dark} />
                            <Text style={styles.title}>Location</Text>
                        </View>
                        <Text style={style.text} >
                            {response.location.country} , {response.location.city}
                        </Text>
                        <ListItemSeparator />
                    </>
                }
                {
                    response.phone && response.phone.length != 0 && <>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons name="phone" size={25} color={colors.dark} />
                            <Text style={styles.title}>Connect info</Text>
                        </View>
                        {
                            response.phone.map((p, i) =>
                                <Text style={style.text} key={i} >
                                    {p.phoneNum.type}: {p.phoneNum.number}
                                </Text>
                            )
                        }

                        <ListItemSeparator />
                    </>
                }
                {response.Skills && response.Skills.length !== 0 && <View>
                    <Text style={styles.title}>Skills</Text>
                    {response.Skills.map((s, index) =>
                        <Text style={style.text} key={index}> {"- " + s} </Text>)}
                </View>}
                {response.Skills && response.Skills.length !== 0 && <ListItemSeparator />}

                <View style={styles.userContainer}>
                    {user.userType !== "Business" &&
                        <ListItem
                            title={response.form.owner.name}
                            subTitle={response.form.owner.specialization}
                            image={response.form.owner.image ? response.form.owner.image : placeholders.profile_placeholder}
                            onPress={() => navigation.navigate(routes.PROFILE, { _id: response.form.owner._id })}

                        />}
                    {user.userType === "Business" && response.owner &&
                        <ListItem
                            title={response.owner.name}
                            subTitle={response.owner.specialization}
                            image={response.owner.image ? response.owner.image : placeholders.profile_placeholder}
                            onPress={() => navigation.navigate(routes.PROFILE, { _id: response.owner._id })}
                        />}
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,
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
        fontSize: 20,
        fontWeight: "bold",
    },
    userContainer: {
        marginVertical: 20,
    },
});

export default ResponseDetailsScreen;
