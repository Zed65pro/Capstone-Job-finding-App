import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableWithoutFeedback, View, Modal } from "react-native"
import useAuth from '../auth/useAuth';
import HeaderText from '../components/HeaderText';
import Screen from '../components/Screen';
import Text from "../components/Text"
import colors from '../config/colors';
import UploadScreen from './UploadScreen';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import AppButton from '../components/Button';
import DateTimePicker from "@react-native-community/datetimepicker"
import AppTextInput from '../components/TextInput';
import CountryPicker from 'react-native-country-picker-modal';
import usersApi from '../api/users';


function PreviousJobsScreen({ navigation }) {

    // var opMode;
    const { user, refreshUser } = useAuth()

    const [jobs, setJobs] = useState(user.prevJobs)
    const [valid, setValid] = useState(true)
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const [date, setDate] = useState("S")
    const [show, setShow] = useState(false);
    const [showCountry, setShowCountry] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("")
    const [position, setPosition] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [opMode, setOpMode] = useState(null)





    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate)
            if (date === "S")
                setStartDate(selectedDate);
            else
                setEndDate(selectedDate)
    };


    const handelSubmit = async () => {

        setProgress(0);
        setUploadVisible(true);
        var local = true
        jobs.forEach(job => {
            if (job.job.location.city === "" || job.job.location.country === "" || job.job.position === "" || job.job.companyName === "" || job.job.duration.start === job.job.duration.end)
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
            const result = await usersApi.updateData({ prevJobs: jobs }, (progress) => setProgress(progress))

            if (!result.ok) {
                setUploadVisible(false);
                return alert("Couldn't apply the update");

            }
            refreshUser(result.data)
            navigation.navigate(routes.PROFILE_SETTINGS)

        } catch (error) {

        }


    }

    const handleChange = () => {

        if (city === "" || country === "" || position === "" || companyName === "" || StartDate === EndDate) {
            Alert.alert("Invalid Inputs", "Please fill all fields")
            return setValid(false)
        }

        if (opMode == null) {

            setValid(true)
            jobs.push({
                job: {
                    position,
                    companyName,
                    location: {
                        city,
                        country
                    },
                    duration: {
                        start: StartDate,
                        end: EndDate
                    }

                }
            })
            setJobs([...jobs])
        } else {
            jobs[opMode.index] = {
                job: {
                    position,
                    companyName,
                    location: {
                        city,
                        country
                    },
                    duration: {
                        start: StartDate,
                        end: EndDate
                    }

                }
            }
        }
        setModalVisible(!modalVisible);

    }

    const prepareData = () => {
        if (opMode) {
            setCity(opMode.value.job.location.city)
            setCountry(opMode.value.job.location.country)
            setStartDate(new Date(opMode.value.job.duration.start))
            setEndDate(new Date(opMode.value.job.duration.end))
            setPosition(opMode.value.job.position)
            setCompanyName(opMode.value.job.companyName)
        }
        else {
            setCity("")
            setCountry("")
            setStartDate(new Date())
            setEndDate(new Date())
            setPosition("")
            setCompanyName("")

        }
    }

    return (
        <Screen>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <AppTextInput placeholder={"Position"} value={position} onChangeText={(text) => setPosition(text)} />
                <AppTextInput placeholder={"Company/Business"} value={companyName} onChangeText={(text) => setCompanyName(text)} />

                <HeaderText>Start Date</HeaderText>

                <TouchableWithoutFeedback onPress={() => {
                    setShow(true);
                    setDate("S")
                }}
                >
                    <View style={styles.Datecontainer}>
                        <Text style={styles.placeholder}>{!StartDate ? "Start Date" : StartDate.toDateString()}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={colors.medium}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <HeaderText>End Date</HeaderText>
                <TouchableWithoutFeedback onPress={() => {
                    setShow(true);
                    setDate("E")
                }}
                >
                    <View style={styles.Datecontainer}>
                        <Text style={styles.placeholder}>{!EndDate ? "End Date" : EndDate.toDateString()}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={colors.medium}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setShowCountry(true)}>
                    <View style={styles.Datecontainer}>
                        <Text style={{ color: colors.medium }}>{country !== "" ? country : "Country"}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <AppTextInput placeholder={"City"} value={city} onChangeText={(text) => setCity(text)} />


                <AppButton title={opMode ? "Edit" : "Add"} onPress={handleChange} />

            </Modal>
            {show && (
                <DateTimePicker
                    testID="DeadlinePicker"
                    value={date === "S" ? StartDate : EndDate}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            {showCountry && <CountryPicker
                visible={showCountry}
                onClose={() => setShowCountry(false)}
                onSelect={(c) => setCountry(c.name)}
                withFlag={false}
            />}
            {(!valid) && <Text style={{ color: colors.danger }}> Invalid Inputs</Text>}
            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />
            <View style={{ margin: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="work" size={30} color={colors.primary} />
                    <Text style={{ margin: 10 }}>Previous work</Text>

                    <TouchableWithoutFeedback onPress={() => {
                        // opMode = null
                        setOpMode(null)
                        prepareData()
                        setModalVisible(true)
                    }}>
                        <View style={{ flexDirection: "row-reverse", marginHorizontal: 10 }}>
                            <MaterialIcons name="add" size={25} color={colors.primary} />
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {
                        jobs.map((v, i) =>
                            <View key={i} style={{ margin: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontWeight: "bold" }}>{v.job.position} at {v.job.companyName}</Text>
                                    <TouchableWithoutFeedback onPress={() => {
                                        // opMode = { value: v, index: i }
                                        setOpMode({ value: v, index: i })
                                        prepareData()
                                        setModalVisible(true)
                                    }}>
                                        <View style={{ flexDirection: "row-reverse", marginHorizontal: 10 }}>
                                            <MaterialIcons name="edit" size={25} color={colors.primary} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => {
                                        var temp = jobs.filter((v, indx) => indx !== i)
                                        setJobs([...temp])
                                    }}>
                                        <View style={{ flexDirection: "row-reverse", marginHorizontal: 10 }}>
                                            <MaterialIcons name="delete" size={25} color={colors.primary} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>

                                    <Ionicons name="time" size={25} color={colors.primary} />
                                    <Text>{new Date(v.job.duration.start).toDateString()} - {new Date(v.job.duration.end).toDateString()}</Text>
                                </View>

                            </View>
                        )
                    }
                </View>

            </View>
            <AppButton title={"Save Edits"} onPress={handelSubmit} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    Datecontainer: {
        backgroundColor: colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
    },
    placeholder: {
        color: colors.medium,
        flex: 1,

    }
});

export default PreviousJobsScreen;