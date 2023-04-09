import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'react-native'
import defaultStyles from "../../config/styles";

import PhoneInput from "react-native-phone-number-input"

function PhoneField({ phoneVal, setPhoneVal }) {

    return (
        <View style={{ width: "100%", flexDirection: "row" }}>

            <PhoneInput value={phoneVal.number} onChangeFormattedText={(phone) => {
                setPhoneVal({ type: phoneVal.type, number: phone })
            }} defaultCode="PS" />
        </View>
    );
}

export default PhoneField;