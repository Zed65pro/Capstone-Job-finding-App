import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import { Alert, ScrollView } from "react-native";
import usersApi from "../api/users"
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
    password: Yup.string().min(6).label("Password").required(),
    confirmPass: Yup.string().min(6).label("Confirmation Password").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    newPass: Yup.string().min(6).label("New Password").required()
});


function ChangePasswordScreen({ route, navigation }) {
    const { user, logOut } = useAuth()
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const signOutAllApi = useApi(usersApi.signOutAll)

    const handleSubmit = async (passwords, { resetForm }) => {

        setProgress(0);
        setUploadVisible(true);

        delete passwords.confirmPass

        const result = await usersApi.changePassword(
            passwords,
            (progress) => setProgress(progress)
        );

        if (!result.ok) {
            setUploadVisible(false);
            console.log(result)
            return alert("Could not change the password");
        }

        resetForm();
        Alert.alert("Password changed !", "Do you want to sign out from all connected devices ?",
            [
                { text: "No", style: "cancel", onPress: () => navigation.navigate(routes.PROFILE_SETTINGS) }, {
                    text: "Yes", onPress: async () => {
                        try {
                            const res = await signOutAllApi.request()
                            if (!res.ok)
                                return alert("Could not signout from all devices");

                            logOut()

                        }
                        catch (e) {
                            console.log(e)
                        }
                    },
                    style: "destructive"
                }], { cancelable: true })

    };

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
                        password: "",
                        newPass: "",
                        confirmPass: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormField
                        maxLength={255}
                        secureTextEntry
                        textContentType="password"
                        name="password"
                        placeholder="Password" />

                    <FormField
                        maxLength={255}
                        name="confirmPass"
                        placeholder="Confirmation Password"
                        secureTextEntry
                        textContentType="password"
                    />
                    <FormField
                        maxLength={255}
                        name="newPass"
                        placeholder="New Password"
                        secureTextEntry
                        textContentType="password"
                    />

                    <SubmitButton title="Change Password" />
                </Form>

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
export default ChangePasswordScreen;