import { Field, FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../Button';

function FormArrayField({ name }) {
    const {
        setFieldTouched,
        setFieldValue,
        errors,
        touched,
        values,
    } = useFormikContext();
    return (
        <FieldArray name={name}
            render={arrayHelpers => (
                <View>
                    {values.skills.map((skill, index) => (
                        <View key={index}>
                            {/** both these conventions do the same */}
                            <Field name={`skills[${index}]`} />

                            <AppButton onClick={() => arrayHelpers.remove(index)}>
                                -
                            </AppButton>
                        </View>
                    ))}
                    <AppButton
                        onClick={() => arrayHelpers.push("Hello")}
                        title={"+"}
                    />
                </View>
            )}


        />
    );
}

const styles = StyleSheet.create({

})
export default FormArrayField;