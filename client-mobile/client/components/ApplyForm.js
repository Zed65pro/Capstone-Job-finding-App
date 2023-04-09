import React from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";

import { Form, SubmitButton } from "./forms";
import responseApi from "../api/responses";

function ApplyForm({ listing, user, onPress }) {
  const handleSubmit = async ({ response }, { resetForm }) => {
    Keyboard.dismiss();
    response = {
      owner: user._id, name: user.name, skills: user.skills,
      email: user.email, gender: user.gender, phone: user.phone,
      specialization: user.specialization,
      location: user.location
    }
    const result = await responseApi.send(response, listing._id);

    if (!result.ok) {
      return Alert.alert("Error", "This Form is already applied.");
    }
    resetForm();

    Alert.alert("Awesome!", "Your response has been received.");
    onPress()
    Notifications.presentLocalNotificationAsync({
      title: "Awesome!",
      body: "Your response has been received.",
    });
  };

  return (
    <Form
      initialValues={{}}
      onSubmit={handleSubmit}
    >
      <SubmitButton title="Apply now !" />
    </Form>
  );
}
export default ApplyForm;
