import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { MonoText } from "../../components/StyledText";
import { SvgXml } from "react-native-svg";
import {
    appointmentIcon,
    cancelIcon,
    completedIcon,
    delegateIcon,
    editIcon,
    inProgressIcon,
    moveIcon,
} from "./SvgIcons";
import { updateDoc } from "firebase/firestore";
import { TodoStatus } from "../../store/enums/todoStatus";
import { useTranslation } from "react-i18next";

export default function BottomModal(props: any) {
    const { t, i18n } = useTranslation();

    async function updateDocument(status: TodoStatus) {
        if (!props.docRef || !status) {
            return;
        }

        props.modalizeRef.current?.close();

        await updateDoc(props.docRef, {
            status: status,
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.todoItemContainer}
                onPress={() => updateDocument(TodoStatus.COMPLETED)}
            >
                <SvgXml
                    onPress={props.onOpen}
                    style={{ marginRight: 16 }}
                    xml={completedIcon}
                />
                <MonoText>{i18n.t("complete")}</MonoText>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.todoItemContainer}
                onPress={() => updateDocument(TodoStatus.IN_PROGRESS)}
            >
                <SvgXml
                    onPress={props.onOpen}
                    style={{ marginRight: 16 }}
                    xml={inProgressIcon}
                />
                <MonoText>{i18n.t("inProgress")}</MonoText>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.todoItemContainer}
                onPress={() => updateDocument(TodoStatus.DELEGATED)}
            >
                <SvgXml
                    onPress={props.onOpen}
                    style={{ marginRight: 16 }}
                    xml={delegateIcon}
                />
                <MonoText>{i18n.t("delegated")}</MonoText>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.todoItemContainer}
                onPress={() => updateDocument(TodoStatus.APPOINTMENT)}
            >
                <SvgXml
                    onPress={props.onOpen}
                    style={{ marginRight: 16 }}
                    xml={appointmentIcon}
                />
                <MonoText>{i18n.t("appointment")}</MonoText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.todoItemContainer}>
                <SvgXml
                    onPress={props.onOpen}
                    style={{ marginRight: 16 }}
                    xml={moveIcon}
                />
                <MonoText>{i18n.t("move")}</MonoText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.todoItemContainer}>
                <SvgXml
                    onPress={props.onOpen}
                    style={{ marginRight: 16 }}
                    xml={editIcon}
                />
                <MonoText>{i18n.t("edit")}</MonoText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 16,
        paddingVertical: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    todoItemContainer: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 4,
        borderBottomWidth: 0.3,
        borderColor: "#C4C4C4",
        paddingVertical: 20,
    },
    button: {
        marginBottom: 4,
        marginLeft: 12,
    },
});
