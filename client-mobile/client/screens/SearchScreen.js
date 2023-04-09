import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal, FlatList } from 'react-native'
import Screen from "../components/Screen"
import TextInput from "../components/TextInput"
import defaultStyles from "../config/styles"
import Text from "../components/Text"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ListItem } from '../components/lists';
import useApi from '../hooks/useApi';
import listingsApi from '../api/listings'
import UsersApi from "../api/users"
import ActivityIndicator from '../components/ActivityIndicator';
import { ErrorMessage } from '../components/forms';
import Card from '../components/Card';
import placeholders from '../config/placeholders';
import routes from '../navigation/routes';


function SearchScreen({ navigation }) {
    const [search, setSearch] = useState("")
    const [res, setRes] = useState([])

    const [filter, setFilter] = useState([
        { label: 'Application', value: 'app' },
        { label: 'Business', value: 'b' },
        { label: 'FreeLancer', value: 'f' },
    ])


    const AppsType = [
        { label: 'Title', value: 'title' },
        { label: 'Job type', value: 'jobType' },
        { label: 'Profession', value: 'profession' },
        { label: 'Location', value: 'place' },
    ]

    const UserType = [
        { label: 'Name', value: 'name' },
        { label: 'Specialization', value: 'specialization' },
        { label: 'Location', value: 'place' },
    ]

    const [by, setBy] = useState({});
    const [searchFor, setFor] = useState("");

    const [byOpen, setByOpen] = useState(false);
    const [forOpen, setForOpen] = useState(false);
    const getListingsApi = useApi(listingsApi.searchForms);
    const getUsersApi = useApi(UsersApi.searchUser);


    const findAndSearch = () => {
        if (searchFor === "Application") {
            getListingsApi.request(by.value + "=" + search)
        } else {
            getUsersApi.request("?userType=" + searchFor + "&" + by.value + "=" + search)
        }
    }
    return (
        <Screen>
            <ActivityIndicator visible={getListingsApi.loading || getUsersApi.loading} />
            <ErrorMessage visible={getListingsApi.error || getUsersApi.error} error={"Couldn't search for the result. An error occured !"} />
            <TextInput placeholder={"Search"} icon={"text-search"} onChangeText={(text) => {
                setSearch(text)
                findAndSearch()
            }} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableWithoutFeedback onPress={() => {
                    setForOpen(true);
                }}
                >
                    <View style={styles.Datecontainer}>
                        <Text style={styles.placeholder}>{searchFor === "" ? "Search for" : searchFor}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={defaultStyles.colors.medium}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    setByOpen(true);
                }}
                >
                    <View style={styles.Datecontainer}>
                        <Text style={styles.placeholder}>{by === {} ? "Search by" : by.label}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={defaultStyles.colors.medium}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <Modal visible={forOpen} onDismiss={() => setForOpen(false)} onRequestClose={() => setForOpen(false)}>
                {
                    filter.map((v, i) =>
                        <ListItem title={v.label} onPress={() => {
                            setForOpen(false)
                            console.log(v.label)
                            setFor(v.label)
                        }} >

                        </ListItem>

                    )
                }

            </Modal>

            {searchFor !== "Application" && <Modal visible={byOpen} onDismiss={() => setForOpen(false)} onRequestClose={() => setForOpen(false)}>
                {
                    UserType.map((v, i) =>
                        <ListItem title={v.label} onPress={() => {
                            setByOpen(false)
                            setBy(v)
                        }} >

                        </ListItem>

                    )
                }

            </Modal>}

            {searchFor === "Application" && <Modal visible={byOpen} onDismiss={() => setByOpen(false)} onRequestClose={() => setByOpen(false)}>
                {
                    AppsType.map((v, i) =>
                        <ListItem title={v.label} onPress={() => {
                            setByOpen(false)
                            setBy(v)
                        }} >

                        </ListItem>

                    )
                }

            </Modal>}
            {
                searchFor === "Application" &&
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
                                navigation.navigate("Feed", { screen: routes.LISTING_DETAILS, params: item })
                            }}
                        />
                    )}
                />
            }
            {
                searchFor !== "Application" &&
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
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    Datecontainer: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        margin: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,

    }
});

export default SearchScreen;