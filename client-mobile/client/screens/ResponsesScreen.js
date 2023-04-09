import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import responsesApi from "../api/responses";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import placeholders from "../config/placeholders";
import usersApi from "../api/users"



function ResponsesScreen({ route, navigation }) {
    const form = route.params
    const getResponsesApi = useApi(!form ? responsesApi.getMyResponses : responsesApi.getFormResponses);
    const getProfile = useApi(usersApi.getUser);

    useEffect(() => {
        const getData = async () => {
            await getResponsesApi.request(form ? form._id : null);
        }
        getData()
        console.log(getResponsesApi.data)
    }, []);

    return (
        <>
            <ActivityIndicator visible={getResponsesApi.loading} />
            <Screen style={styles.screen}>
                {getResponsesApi.error && (
                    <>
                        <AppText>Couldn't retrieve the listings.</AppText>
                        <Button title="Retry" onPress={getResponsesApi.request} />
                    </>
                )}
                <FlatList
                    data={getResponsesApi.data}
                    keyExtractor={(listing) => {
                        if (form)
                            listing.form = form
                        return listing._id
                    }}
                    renderItem={({ item }) => (
                        <Card
                            title={item.form.title + " at " + item.form.owner.name}
                            subTitle={"Submitted on " + new Date(item.createdAt).toDateString()}
                            onPress={() => {
                                console.log(item)
                                navigation.navigate(routes.RESPONSE_DETAILS, item)
                            }}
                            imageUrl={ form ? ( item.owner && item.owner.image ? item.owner.image : placeholders.profile_placeholder) : null}
                        />

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

export default ResponsesScreen;
