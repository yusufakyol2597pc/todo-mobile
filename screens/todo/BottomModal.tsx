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
    moveSomeDayIcon,
    moveTodayIcon,
    moveToNextIcon,
} from "./SvgIcons";
import {
    collection,
    deleteDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { TodoStatus } from "../../store/enums/todoStatus";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { closeConfirmDialog } from "../../store/actions/global.actions";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { TodoType } from "../../store/enums/todoType";
import { Modalize } from "react-native-modalize";
import { TodoDay } from "../../store/enums/todoDay";
import { auth, db } from "../../firebase";

export default function BottomModal(props: any) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [isMove, setIsMove] = useState(false);

    useEffect(() => {
        setIsMove(false);
    }, []);

    function orderByIndex(a, b) {
        if (a.data && b.data) {
            var keyA = a.data().index,
                keyB = b.data().index;
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        }

        return 0;
    }

    function getFirstIndex(todoList) {
        let todoIndex = 0;
        for (let index = 0; index < todoList.length; index++) {
            const todo = todoList[index];
            if (todo.data && todo.data().index !== undefined) {
                todoIndex = todo.data().index;
                break;
            }
        }
        return todoIndex;
    }

    async function updateDocument(status: TodoStatus) {
        if (!props.docRef || !status) {
            return;
        }

        props.modalizeRef.current?.close();

        updateDoc(props.docRef, {
            status: status,
        })
            .then(() => {})
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
    }

    function deleteTodo() {
        if (!props.docRef) {
            return;
        }
        props.modalizeRef.current?.close();
        deleteDoc(props.docRef)
            .then(() => {
                /*Toast.show({
                  type: "success",
                  text1: "Todo is deleted.",
              });*/
            })
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
    }

    async function moveToday() {
        if (!props.docRef) {
            return;
        }
        props.modalizeRef.current?.close();
        var date = new Date();

        const beginningOfTheDay = new Date();
        const endOfTheDay = new Date();

        beginningOfTheDay.setHours(0, 0, 0, 0);
        endOfTheDay.setHours(23, 59, 59, 99);

        var q = query(
            collection(db, "todo"),
            where("type", "==", TodoType.DAILY),
            where("userId", "==", auth.currentUser?.uid),
            where("date", ">=", beginningOfTheDay),
            where("date", "<=", endOfTheDay)
        );

        const querySnapshot = await getDocs(q);
        let todoList = [];
        querySnapshot.forEach((doc) => {
            todoList.push(doc);
        });
        todoList.sort(orderByIndex);
        const index = getFirstIndex(todoList) - 1;

        updateDoc(props.docRef, {
            type: TodoType.DAILY,
            date: date,
            index: index,
        })
            .then(() => {})
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
    }

    async function moveToNextDay() {
        if (!props.docRef) {
            return;
        }
        props.modalizeRef.current?.close();
        const beginningOfTheDay = new Date();
        beginningOfTheDay.setDate(beginningOfTheDay.getDate() + 1);
        const endOfTheDay = new Date();
        endOfTheDay.setDate(beginningOfTheDay.getDate() + 1);

        beginningOfTheDay.setHours(0, 0, 0, 0);
        endOfTheDay.setHours(23, 59, 59, 99);

        var q = query(
            collection(db, "todo"),
            where("type", "==", TodoType.DAILY),
            where("userId", "==", auth.currentUser?.uid),
            where("date", ">=", beginningOfTheDay),
            where("date", "<=", endOfTheDay)
        );

        const querySnapshot = await getDocs(q);
        let todoList = [];
        querySnapshot.forEach((doc) => {
            todoList.push(doc);
        });
        todoList.sort(orderByIndex);
        const index = getFirstIndex(todoList) - 1;

        var date = new Date();
        date.setDate(date.getDate() + 1);
        updateDoc(props.docRef, {
            type: TodoType.DAILY,
            date: date,
            index: index,
        })
            .then(() => {})
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
    }

    async function moveToSomeDay() {
        if (!props.docRef) {
            return;
        }
        props.modalizeRef.current?.close();

        var q = query(
            collection(db, "todo"),
            where("type", "==", TodoType.SOME_DAY),
            where("userId", "==", auth.currentUser?.uid)
        );

        const querySnapshot = await getDocs(q);
        let todoList = [];
        querySnapshot.forEach((doc) => {
            todoList.push(doc);
        });
        todoList.sort(orderByIndex);
        const index = getFirstIndex(todoList) - 1;

        updateDoc(props.docRef, {
            type: TodoType.SOME_DAY,
            index: index,
        })
            .then(() => {})
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
    }

    if (isMove) {
        return (
            <Modalize
                modalHeight={props.day === TodoDay.PREVIOUS ? 300 : 240}
                ref={props.modalizeRef}
                handlePosition="inside"
                onClosed={() => {
                    setIsMove(false);
                }}
            >
                <View style={styles.container}>
                    {(props.day === TodoDay.NEXT_DAY ||
                        props.day === TodoDay.SOME_DAY ||
                        props.day === TodoDay.PREVIOUS) && (
                        <TouchableOpacity
                            style={styles.todoItemContainer}
                            onPress={() => moveToday()}
                        >
                            <SvgXml
                                style={{ marginRight: 16 }}
                                xml={moveTodayIcon}
                            />
                            <MonoText style={styles.title}>
                                {i18n.t("moveToday")}
                            </MonoText>
                        </TouchableOpacity>
                    )}

                    {props.day !== TodoDay.NEXT_DAY && (
                        <TouchableOpacity
                            style={styles.todoItemContainer}
                            onPress={() => moveToNextDay()}
                        >
                            <SvgXml
                                style={{ marginRight: 16 }}
                                xml={moveToNextIcon}
                            />
                            <MonoText style={styles.title}>
                                {i18n.t("moveNextDay")}
                            </MonoText>
                        </TouchableOpacity>
                    )}

                    {props.day !== TodoDay.SOME_DAY && (
                        <TouchableOpacity
                            style={styles.todoItemContainer}
                            onPress={() => moveToSomeDay()}
                        >
                            <SvgXml
                                style={{ marginRight: 16 }}
                                xml={moveSomeDayIcon}
                            />
                            <MonoText style={styles.title}>
                                {i18n.t("moveSomeDay")}
                            </MonoText>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.todoItemContainer}
                        onPress={() => setIsMove(false)}
                    >
                        <SvgXml style={{ marginRight: 16 }} xml={cancelIcon} />
                        <MonoText style={styles.title}>
                            {i18n.t("cancel")}
                        </MonoText>
                    </TouchableOpacity>
                </View>
            </Modalize>
        );
    }

    return (
        <Modalize
            modalHeight={490}
            ref={props.modalizeRef}
            handlePosition="inside"
            onClosed={() => {
                setIsMove(false);
                //props.setEditFunc(false);
            }}
        >
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
                    <MonoText style={styles.title}>
                        {i18n.t("complete")}
                    </MonoText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.todoItemContainer}
                    onPress={() => updateDocument(TodoStatus.IN_PROGRESS)}
                >
                    <SvgXml style={{ marginRight: 16 }} xml={inProgressIcon} />
                    <MonoText style={styles.title}>
                        {i18n.t("inProgress")}
                    </MonoText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.todoItemContainer}
                    onPress={() => updateDocument(TodoStatus.DELEGATED)}
                >
                    <SvgXml style={{ marginRight: 16 }} xml={delegateIcon} />
                    <MonoText style={styles.title}>
                        {i18n.t("delegated")}
                    </MonoText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.todoItemContainer}
                    onPress={() => updateDocument(TodoStatus.APPOINTMENT)}
                >
                    <SvgXml style={{ marginRight: 16 }} xml={appointmentIcon} />
                    <MonoText style={styles.title}>
                        {i18n.t("appointment")}
                    </MonoText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.todoItemContainer}
                    onPress={() => setIsMove(true)}
                >
                    <SvgXml style={{ marginRight: 16 }} xml={moveIcon} />
                    <MonoText style={styles.title}>{i18n.t("move")}</MonoText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.todoItemContainer}
                    onPress={() => {
                        props.setEditFunc(true);
                        props.modalizeRef.current?.close();
                    }}
                >
                    <SvgXml style={{ marginRight: 16 }} xml={editIcon} />
                    <MonoText style={styles.title}>{i18n.t("edit")}</MonoText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.todoItemContainer}
                    onPress={() => deleteTodo()}
                >
                    <SvgXml style={{ marginRight: 16 }} xml={cancelIcon} />
                    <MonoText style={styles.title}>{i18n.t("delete")}</MonoText>
                </TouchableOpacity>
            </View>
        </Modalize>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F6F6",
        paddingLeft: 16,
        paddingVertical: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 16,
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
        paddingVertical: 22,
    },
    button: {
        marginBottom: 4,
        marginLeft: 12,
    },
});
