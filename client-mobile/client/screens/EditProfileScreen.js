import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import { TouchableWithoutFeedback, View, ScrollView } from "react-native";
import defaultStyles from "../config/styles";
import Text from "../components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderText from "../components/HeaderText";
import colors from "../config/colors"
import CountryPicker from 'react-native-country-picker-modal';
import usersApi from "../api/users"
import routes from "../navigation/routes";
import CategoryPickerItem from "../components/CategoryPickerItem"
import placeholders from "../config/placeholders";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(1).label("Name"),
    bio: Yup.string().label("Bio"),
    specialization: Yup.object().nullable().label("Field"),
    city: Yup.string().nullable().label("City"),

});

const categories = placeholders.categories

function EditProfileScreen({ route, navigation }) {
    const { user, refreshUser } = useAuth()
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [date, setDate] = useState(user.dayOfBirth ? new Date(user.dayOfBirth) : new Date());
    const [show, setShow] = useState(false);
    const [showCountry, setShowCountry] = useState(false);
    const [country, setCountry] = useState(user.location ? user.location.country : "");

    const handleSubmit = async (profile, { resetForm }) => {

        profile.specialization = profile.specialization.value
        setProgress(0);
        setUploadVisible(true);

        profile = { ...profile, dayOfBirth: date, country }
        const obj = {
            country: profile.country,
            city: profile.city
        }




        delete profile.country
        delete profile.city
        profile.location = obj

        const result = await usersApi.editUser(
            user,
            profile,
            (progress) => setProgress(progress)
        );

        if (!result.ok) {
            setUploadVisible(false);
            console.log(result)
            return alert("Could not update the profile");
        }

        refreshUser(result.data)
        console.log(result)
        resetForm();
        setDate(new Date())
        setCountry("")
        navigation.navigate(routes.PROFILE, { _id: user._id })


    };




    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate)
            setDate(selectedDate);
    };


    const findField = () => {
        var field = null;
        categories.forEach((item) => {
            if (item.value === user.specialization) {
                field = item
                return
            }
            if (!field)
                field =
                {
                    backgroundColor: "#fc5c65",
                    icon: "curr",
                    label: user.specialization,
                    value: user.specialization,
                }

        })
        return field
    }

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <UploadScreen
                    onDone={() => setUploadVisible(false)}
                    progress={progress}
                    visible={uploadVisible}
                />
                <Form
                    initialValues={{
                        name: user.name,
                        bio: user.bio,
                        specialization: findField(),
                        city: user.location ? user.location.city : "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormField maxLength={255} name="name" placeholder="Name" />
                    <FormField
                        maxLength={500}
                        multiline
                        name="bio"
                        numberOfLines={4}
                        placeholder="Bio"
                    />
                    <HeaderText>Birthdate</HeaderText>
                    <TouchableWithoutFeedback onPress={() => {
                        setShow(true);
                    }}
                    >
                        <View style={styles.Datecontainer}>
                            <Text style={styles.placeholder}>{!date ? "Birthdate" : date.toDateString()}</Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color={defaultStyles.colors.medium}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <Picker
                        items={categories}
                        name="specialization"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        placeholder={user.specialization}
                        width="50%"

                    />

                    <HeaderText>
                        Location
                    </HeaderText>
                    <TouchableWithoutFeedback onPress={() => setShowCountry(true)}>
                        <View style={styles.Datecontainer}>
                            <Text style={{ color: colors.medium }}>{country !== "" ? country : "Country"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <FormField
                        maxLength={20}
                        name="city"
                        placeholder="City"
                    />
                    {showCountry && <CountryPicker
                        visible={showCountry}
                        onClose={() => setShowCountry(false)}
                        onSelect={(c) => setCountry(c.name)}
                        withFlag={false}
                    />}

                    <SubmitButton title="Edit" />
                </Form>
                {show && (
                    <DateTimePicker
                        testID="DeadlinePicker"
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </ScrollView>
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
        marginVertical: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,

    }
});
export default EditProfileScreen;