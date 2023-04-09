import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";


import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,

} from "../components/forms";
import RadioButtonGroup from "../components/forms/RadioButtonGroup";
import RadioButtonField from "../components/forms/RadioButtonField";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import { FieldArray } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  userType: Yup.string().required().label("User type"),
  gender: Yup.string().label("Gender"),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  useEffect(() => {
    setSelectGender(false)
  }, [])
  const handleSubmit = (userInfo) => {
    console.log('====================================');
    console.log("hiiiiiiiiiiiiiiiiiii");
    console.log('====================================');
    if (userInfo.userType == "Business")
      delete userInfo.gender
    console.log(userInfo);
    registerApi.request(userInfo).then((result) => {
      console.log('=============Handle submit=======================');
      console.log(result.data);
      console.log('====================================');
      auth.logIn(result.data);
    }).catch((result) => {
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          console.log("An unexpected error occurred.");
        }
        return;
      }
    })

  };

  const [selectGender, setSelectGender] = useState(false)

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "", gender: "", userType: "" }}
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
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <RadioButtonGroup name={"userType"} label={"User Type"} onValueChange={(value) => setSelectGender(value !== "Business")
          }>
            <RadioButtonField label={"Business"} value={"Business"} style={{ color: defaultStyles.colors.medium }} />
            <RadioButtonField label={"Employee"} value={"Employee"} style={{ color: defaultStyles.colors.medium }} onPress={() => setSelectGender(true)} />
            <RadioButtonField label={"Freelancer"} value={"FreeLancer"} style={{ color: defaultStyles.colors.medium }} onPress={() => setSelectGender(true)} />

          </RadioButtonGroup>

          {selectGender && <RadioButtonGroup name={"gender"} label={"Gender"}>
            <RadioButtonField label={"Male"} value={"Male"} style={{ color: defaultStyles.colors.medium }} />
            <RadioButtonField label={"Female"} value={"Female"} style={{ color: defaultStyles.colors.medium }} />
          </RadioButtonGroup>}
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
