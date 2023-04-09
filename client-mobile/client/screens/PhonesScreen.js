import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from "react-native"
import HeaderText from "../components/HeaderText"
import Icon from '../components/Icon';
import useAuth from "../auth/useAuth"
import Screen from '../components/Screen';
import AppTextInput from '../components/TextInput';
import AppButton from '../components/Button';
import colors from '../config/colors';
import Text from "../components/Text"
import usersApi from "../api/users"
import UploadScreen from './UploadScreen';
import routes from '../navigation/routes';


function PhonesScreen({ navigation }) {
    const { user, refreshUser } = useAuth()

    const [phones, setPhones] = useState(user.phone)
    const [valid, setValid] = useState(true)
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const handelSubmit = async () => {

        setProgress(0);
        setUploadVisible(true);
        var local = true

        console.log(phones);
        phones.forEach(phone => {
            if (phone.phoneNum.type === "" || phone.phoneNum.number === "")
                local = false
        });
        setValid(local)
        console.log('====================================');
        console.log(valid);
        console.log('====================================');
        if (!local) {
            return
        }

        try {
            const result = await usersApi.updateData({ phone: phones }, (progress) => setProgress(progress))

            if (!result.ok) {
                setUploadVisible(false);
                return alert("Couldn't apply the update");

            }
            refreshUser(result.data)
            navigation.navigate(routes.PROFILE_SETTINGS)

        } catch (error) {

        }

    }

    return (
        <Screen>
            {(!valid) && <Text style={{ color: colors.danger }}> Invalid Inputs, please fill all input</Text>}
            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <HeaderText width="50%">
                    Phones
                </HeaderText>
                <TouchableWithoutFeedback onPress={() => {

                    setPhones([...phones, { phoneNum: { type: "Mobile", number: "" } }])
                }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <Icon name={"plus"} backgroundColor={colors.primary} iconColor={colors.light} />
                    </View>

                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    phones.pop()
                    setPhones([...phones])
                }}
                >
                    <View style={{ marginHorizontal: 10 }}>
                        <Icon name={"minus"} backgroundColor={colors.primary} iconColor={colors.light} />
                    </View>

                </TouchableWithoutFeedback>
            </View>
            {
                phones.map((phone, i) =>
                    <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                        <AppTextInput width="45%" onChangeText={(text) => {
                            phones[i].phoneNum['type'] = text
                            setPhones([...phones])
                        }}>
                            {phone.phoneNum.type}
                        </AppTextInput>
                        <Text style={{ fontSize: 30 }}>
                            {": "}
                        </Text>
                        <AppTextInput width="45%" keyboardType="phone-pad" onChangeText={(text) => {
                            phones[i].phoneNum['number'] = text
                            setPhones([...phones])
                        }}
                        >
                            {phones[i].phoneNum.number}
                        </AppTextInput>
                    </View>
                )
            }
            <AppButton title={"Edit numbers"} onPress={handelSubmit} />

        </Screen>
    );
}

export default PhonesScreen;