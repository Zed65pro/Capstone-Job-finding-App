import React, { useEffect, useState } from "react";
import { Alert, View, Keyboard, KeyboardAvoidingView, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import DropDownPicker from 'react-native-dropdown-picker';

import responseApi from "../api/responses";

import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,

} from "../components/forms";
import RadioButtonGroup from "../components/forms/RadioButtonGroup";
import RadioButtonField from "../components/forms/RadioButtonField";
import PhoneField from "../components/forms/PhoneField";
import HeaderText from "../components/HeaderText";
import routes from "../navigation/routes";
import AppText from "../components/Text";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    gender: Yup.string().label("Gender"),
    name: Yup.string().required().label("Name"),
    specialization: Yup.string().required().label("Specialization"),
    country: Yup.string().required().label("Country"),
    city: Yup.string().required().label("City"),

});


function ApplyFormScreen({ route, navigation }) {

    const [error, setError] = useState();

    const listing = route.params;
    const [value, setValue] = useState([]);
    const [items, setSkills] = useState([
        { label: 'Fast Learner', value: 'fast learner' },
        { label: 'Work under presure', value: 'work under presure' },
        { label: 'Problem solving', value: 'problem solving' },
        { label: 'Critical thinking', value: 'critical thinking' },
    ]);



    const [open, setOpen] = useState(false);

    const [phoneNum, setPhoneNum] = useState({ type: "Phone", number: "" })
    const [officeNum, setOfficeNum] = useState(null)
    const [faxNum, setFaxNum] = useState(null)


    const handleSubmit = async (responseInfo) => {
        responseInfo.location = {
            country: responseInfo.country,
            city: responseInfo.city
        }
        responseInfo.Skills = value
        responseInfo.phone = [

            { phoneNum: { ...phoneNum } },
        ]
        delete responseInfo.country
        delete responseInfo.city
        Keyboard.dismiss();
        const result = await responseApi.send(responseInfo, listing._id);
        if (!result.ok) {
            return Alert.alert("Error", "Could not send the response.");
        }
        Alert.alert("Successfully", "Your application has been sent successfully")
        navigation.navigate(routes.LISTING)

    };

    return (
        <Screen style={styles.container}>
            <AppText style={{ fontWeight: "bold" }}>{listing.title} at/for {listing.owner.name.charAt(0).toUpperCase() + listing.owner.name.slice(1)}</AppText>
            <ScrollView>
                <KeyboardAvoidingView behavior="height"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
                >
                    <Form
                        initialValues={{ name: "", email: "", gender: "", phone: [], }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={error} visible={error} />
                        <FormField
                            autoCorrect={false}
                            icon="account"
                            name="name"
                            placeholder="Name"
                        />
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email"
                            textContentType="emailAddress"
                        />

                        <RadioButtonGroup name={"gender"} label={"Gender"} icon={"gender-male-female"}>
                            <RadioButtonField label={"Male"} value={"Male"} style={{ color: defaultStyles.colors.medium }} />
                            <RadioButtonField label={"Female"} value={"Female"} style={{ color: defaultStyles.colors.medium }} />
                        </RadioButtonGroup>

                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setSkills}
                            addCustomItem={true}
                            searchable={true}
                            placeholder={"Skills"}
                            placeholderStyle={[defaultStyles.text, { color: defaultStyles.colors.medium }]}
                            style={{ backgroundColor: defaultStyles.colors.light }}

                            listItemContainerStyle={{ backgroundColor: defaultStyles.colors.light }}
                            listItemLabelStyle={[defaultStyles.text, { color: defaultStyles.colors.medium }]}
                            multiple={true}
                            mode="BADGE"
                        />
                        <View style={{ marginTop: open ? items.length * 50 : 10 }} >
                            <>
                                <HeaderText icon={"phone"} >
                                    {phoneNum.type}
                                </HeaderText>
                                <PhoneField phoneVal={phoneNum} setPhoneVal={setPhoneNum} />
                            </>
                            {/* {phoneNums.map((val, index) => {
                        return (
                            <>
                                <HeaderText icon={"phone"} key={index} onPress={() => {
                                    phoneNums = phoneNums.filter((v) => v !== val)
                                    setphoneNums(phoneNums)
                                }}> {val.type} </HeaderText>
                                <PhoneField phoneVal={val.number} />
                            </>)
                    })} */}
                        </View>
                        <FormField
                            autoCorrect={true}
                            icon="office-building"
                            name="specialization"
                            placeholder="Specialization"
                        />
                        <FormField
                            autoCorrect={true}
                            icon="earth"
                            name="country"
                            placeholder="Country"
                        />
                        <FormField
                            autoCorrect={true}
                            icon="city"
                            name="city"
                            placeholder="City"
                        />
                        <SubmitButton title="Apply Now !" />
                    </Form>
                </KeyboardAvoidingView>

            </ScrollView>

        </Screen >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default ApplyFormScreen;