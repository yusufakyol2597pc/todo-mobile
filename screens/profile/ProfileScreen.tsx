import { signOut, updatePassword } from "firebase/auth";
import React, { Component, useState } from "react";
import {
    AppRegistry,
    DevSettings,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { MonoText } from "../../components/StyledText";
import { auth } from "../../firebase";
import { RootTabScreenProps } from "../../types";
import { CustomizedInput } from "../../components/CustomizedInput";
import { useForm } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import * as Localization from "expo-localization";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const enIcon = require("../../assets/images/en.png");
const trIcon = require("../../assets/images/tr-TR.png");

export default function ProfileScreen({
    navigation,
}: RootTabScreenProps<"TabThree">) {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(Localization.locale);
    const [items, setItems] = useState(getLanguages());
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
        },
    });
    function handleIndexChange(index: number) {
        console.log("inde", index);
    }

    function getLanguages() {
        return [
            {
                label: i18n.t("english"),
                value: "en",
                icon: () => (
                    <Image source={enIcon} style={{ width: 24, height: 24 }} />
                ),
            },
            {
                label: i18n.t("turkish"),
                value: "tr",
                icon: () => (
                    <Image source={trIcon} style={{ width: 24, height: 24 }} />
                ),
            },
        ];
    }

    const onSubmit = (data) => {
        console.log("data", data);
        i18n.changeLanguage(value);
        if (data.password.length > 0) {
            if (data.password !== data.confirm_password) {
                Toast.show({
                    type: "error",
                    text1: i18n.t("passwordsNotSame"),
                });
                return;
            }
            const user = auth.currentUser;
            if (!user) {
                return;
            }
            updatePassword(user, data.password)
                .then(() => {
                    Toast.show({
                        type: "success",
                        text1: i18n.t("changesSaved"),
                    });
                })
                .catch((error) => {
                    Toast.show({
                        type: "error",
                        text1: i18n.t("errorOccured"),
                    });
                });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={styles.container}>
                <MonoText
                    style={{
                        fontSize: 16,
                        marginBottom: 24,
                        color: "#38383A",
                        fontWeight: "400",
                    }}
                >
                    {i18n.t("profile")}
                </MonoText>

                <View style={{ marginBottom: 24 }}>
                    <MonoText style={{ marginBottom: 3 }}>Email</MonoText>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={auth.currentUser?.email}
                            editable={false}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 24 }}>
                    <MonoText style={{ marginBottom: 3 }}>
                        {i18n.t("password")}
                    </MonoText>
                    <CustomizedInput
                        name="password"
                        secureTextEntry={true}
                        control={control}
                        borderColor="#C4C4C4"
                    />
                </View>

                <View style={{ marginBottom: 24 }}>
                    <MonoText style={{ marginBottom: 3 }}>
                        {i18n.t("confirmPassword")}
                    </MonoText>
                    <CustomizedInput
                        name="confirm_password"
                        secureTextEntry={true}
                        control={control}
                        borderColor="#C4C4C4"
                    />
                </View>

                <MonoText style={{ marginBottom: 3, alignSelf: "flex-start" }}>
                    {i18n.t("language")}
                </MonoText>
                <DropDownPicker
                    placeholder={i18n.t("selectLang")}
                    style={{ marginBottom: 24, borderColor: "#C4C4C4" }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />

                <View style={{ paddingHorizontal: 16, width: "100%" }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <MonoText style={{ color: "white", fontSize: 14 }}>
                            {i18n.t("saveChanges")}
                        </MonoText>
                    </TouchableOpacity>
                </View>

                <View style={styles.line} />

                <MonoText style={{ marginBottom: 16, alignSelf: "flex-start" }}>
                    {i18n.t("terms")}
                </MonoText>
                <MonoText style={{ alignSelf: "flex-start" }}>
                    {i18n.t("privacy")}
                </MonoText>

                <View style={styles.line} />

                <MonoText
                    style={{
                        textDecorationLine: "underline",
                        alignSelf: "center",
                    }}
                    onPress={() => {
                        signOut(auth)
                            .then(() => {
                                // Sign-out successful.
                            })
                            .catch((error) => {
                                // An error happened.
                            });
                    }}
                >
                    {i18n.t("logout")}
                </MonoText>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFEFE",
        paddingHorizontal: 16,
        paddingTop: 72,
    },
    button: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 24,
        elevation: 3,
        backgroundColor: "#38383A",
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 8,
        width: "100%",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#C4C4C4",
        backgroundColor: "#F1F1F1",
    },
    input: {
        width: "100%",
        fontSize: 14,
        fontFamily: "pressura-mono",
    },
    line: {
        width: "100%",
        height: 0.3,
        backgroundColor: "#C4C4C4",
        marginVertical: 24,
    },
});
