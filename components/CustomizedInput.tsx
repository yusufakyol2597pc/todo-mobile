import { StyleSheet, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Controller } from "react-hook-form";
import { Text, View } from "./Themed";

export function CustomizedInput(props: any) {
    return (
        <View style={styles.inputContainer}>
            {props.icon ? <Ionicons name={props.icon} size={32} color="gray" /> : null}
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
                        placeholder={props.placeholder}
                    />
                )}
                name={props.name}
            />
            {props.errors["" +props.name] && <Text>This is required.</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        width: "100%",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        marginBottom: 16
    },
    input: {
        marginLeft: 6,
        width: "100%",
        fontSize: 18
    }
});