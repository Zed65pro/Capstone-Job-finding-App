import React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import AppText from '../Text';
import defaultStyles from '../../config/styles'
import { useFormikContext } from 'formik';
function RadioButtonField({ label, value, style }) {
    const {
        setFieldValue,
        values
    } = useFormikContext();
    return (
        <View style={{ flexDirection: 'row', padding: 5 }}>
            <AppText style={[{ padding: 5 }, style]}>{label}</AppText>
            <RadioButton value={value} color={defaultStyles.colors.primary} />
        </View>

    );
}

export default RadioButtonField;