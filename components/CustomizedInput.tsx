import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { View } from "./Themed";
import { SvgXml } from "react-native-svg";
import { deleteIcon, eyeIcon } from "../screens/login/SvgIcons";
import { useState } from "react";

export function CustomizedInput(props: any) {
    const { register, setValue } = useForm();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    return (
        <View
            style={{
                ...styles.inputContainer,
                backgroundColor: props.bgColor,
                borderColor: props.borderColor,
            }}
        >
            <Controller
                control={props.control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: props.bgColor,
                            justifyContent: "space-between",
                        }}
                    >
                        <TextInput
                            style={styles.input}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            secureTextEntry={
                                props.toggleSecureText && secureTextEntry
                                    ? true
                                    : false
                            }
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: props.bgColor,
                            }}
                        >
                            {props.delete && value && value.length > 0 ? (
                                <TouchableOpacity
                                    style={{ marginRight: 8 }}
                                    onPress={() =>
                                        props.setValue
                                            ? props.setValue(props.name, "")
                                            : null
                                    }
                                >
                                    <SvgXml xml={deleteIcon} />
                                </TouchableOpacity>
                            ) : null}
                            {props.toggleSecureText ? (
                                <TouchableOpacity
                                    style={{ marginRight: 8 }}
                                    onPress={() =>
                                        setSecureTextEntry(
                                            (secureTextEntry) =>
                                                !secureTextEntry
                                        )
                                    }
                                >
                                    <SvgXml xml={eyeIcon} />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                )}
                name={props.name}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 8,
        width: "100%",
        borderWidth: 1,
        borderRadius: 8,
    },
    input: {
        width: "80%",
        fontSize: 14,
        fontFamily: "pressura-mono",
    },
});
