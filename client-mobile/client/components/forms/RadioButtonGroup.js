import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import { StyleSheet, View } from "react-native";
import { RadioButton } from 'react-native-paper';
import defaultStyles from "../../config/styles";
import HeaderText from "../HeaderText";

function RadioButtonGroup({ icon, name, label, width, children, onValueChange, style, ...otherProps }) {
    const {
        handleChange,
        errors,
        touched,
        values,
    } = useFormikContext();
    const test = (name) => {
        if (onValueChange)
            onValueChange(values[name])
        return handleChange(name)
    }
    useEffect(() => handleChange, [])
    return (
        <>
            <View style={style}>
                {label && <HeaderText style={styles.title} icon={icon}>{label}</HeaderText>}
                <RadioButton.Group
                    onValueChange={
                        test(name)
                    }
                    value={values[name]}
                >
                    {children}
                </RadioButton.Group>
            </View>

            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 5,
        color: defaultStyles.colors.dark
    }
})
export default RadioButtonGroup;
