import { StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Text, View } from "./Themed";

export function CustomizedInput(props: any) {
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
                    <TextInput
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry={props.secureTextEntry ? true : false}
                    />
                )}
                name={props.name}
            />
            {props.icon ? (
                <Ionicons name={props.icon} size={24} color="gray" />
            ) : null}
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
        width: "100%",
        fontSize: 14,
        fontFamily: "pressura-mono",
    },
});
