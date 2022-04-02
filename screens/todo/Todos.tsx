import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Text, View } from "../../components/Themed";
import { auth, db } from "../../firebase";
import {
    collection,
    query,
    where,
    onSnapshot,
    DocumentData,
    deleteDoc,
} from "firebase/firestore";
import Toast from "react-native-toast-message";
import {
    closeConfirmDialog,
    openConfirmDialog,
} from "../../store/actions/global.actions";
import { TodoStatus } from "../../store/enums/todoStatus";
import { TodoType } from "../../store/enums/todoType";
import { useForm } from "react-hook-form";
import { MonoText } from "../../components/StyledText";
import { SvgXml } from "react-native-svg";
import { Modalize } from "react-native-modalize";
import { Host, Portal } from "react-native-portalize";
import {
    appointmentIcon,
    completedIcon,
    delegateIcon,
    emptyIcon,
    inProgressIcon,
} from "./SvgIcons";
import BottomModal from "./BottomModal";
import { useTranslation } from "react-i18next";

function TodoItem(props: any) {
    const { t, i18n } = useTranslation();
    const [create, setCreate] = useState(false);
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            todoTitle: "",
        },
    });

    function deleteTodo(docRef: any) {
        dispatch(closeConfirmDialog());
        deleteDoc(docRef)
            .then(() => {
                Toast.show({
                    type: "success",
                    text1: "Todo is deleted.",
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
    }

    function getIcon(status: number): string | null {
        switch (status) {
            case TodoStatus.NOT_STARTED:
                return emptyIcon;
            case TodoStatus.IN_PROGRESS:
                return inProgressIcon;
            case TodoStatus.COMPLETED:
                return completedIcon;
            case TodoStatus.DELEGATED:
                return delegateIcon;
            case TodoStatus.APPOINTMENT:
                return appointmentIcon;
            default:
                return emptyIcon;
        }
    }

    return (
        <View
            style={{
                ...styles.todoItemContainer,
                backgroundColor: props.bgColor,
                borderColor: props.lineColor,
            }}
        >
            <TouchableOpacity>
                <SvgXml
                    onPress={
                        props.todo.title
                            ? () => props.onOpen(props.docRef)
                            : undefined
                    }
                    style={{ marginRight: 16 }}
                    xml={getIcon(props.todo.status)}
                />
            </TouchableOpacity>
            {props.todo.title ? <MonoText>{props.todo.title}</MonoText> : null}
            {props.tapToCreate ? (
                create ? (
                    <TextInput onChangeText={() => console.log("asda")} />
                ) : (
                    <Text
                        onPress={() => setCreate(true)}
                        style={{
                            opacity: 0.3,
                            fontSize: 16,
                            fontStyle: "italic",
                        }}
                    >
                        {i18n.t("tapToAddSomething")}
                    </Text>
                )
            ) : (
                <Text></Text>
            )}
        </View>
    );
}

export default function Todos(props: any) {
    const { t, i18n } = useTranslation();
    const modalizeRef = useRef<Modalize>(null);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [bgColor, setBgColor] = useState("#FFFEFE");
    const [lineColor, setLineColor] = useState("#FFFEFE");
    const [todos, setTodos] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            status: TodoStatus.NOT_STARTED,
            type: TodoType.DAILY,
            date: new Date(),
        },
    });

    function setDailyTodos() {
        if (!props.date.isToday) {
            setBgColor("#F1EADE");
        }
        const beginningOfTheDay = new Date(props.date.date);
        const endOfTheDay = new Date(props.date.date);

        beginningOfTheDay.setHours(0, 0, 0, 0);
        endOfTheDay.setHours(23, 59, 59, 99);

        const q = query(
            collection(db, "todo"),
            where("userId", "==", auth.currentUser?.uid),
            where("date", ">=", beginningOfTheDay),
            where("date", "<=", endOfTheDay)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todoList: any = [];
            querySnapshot.forEach((doc) => {
                todoList.push(doc);
            });
            const length = 10 - todoList.length;
            if (length > 0) {
                todoList.push({ tapToCreate: true });
                for (let index = 0; index < length - 1; index++) {
                    todoList.push({});
                }
            }
            setTodos(todoList);
        });

        return unsubscribe;
    }

    function setPreviousTodos() {
        const createdAt = props.date.date.toDate();
        createdAt.setHours(23, 59, 59, 99);
        const q = query(
            collection(db, "todo"),
            where("userId", "==", auth.currentUser?.uid),
            where("date", ">=", props.date.date),
            where("date", "<", createdAt)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todoList: any = [];
            querySnapshot.forEach((doc) => {
                todoList.push(doc);
            });
            const length = 10 - todoList.length;
            if (length > 0) {
                todoList.push({ tapToCreate: true });
                for (let index = 0; index < length - 1; index++) {
                    todoList.push({});
                }
            }
            setTodos(todoList);
        });

        return unsubscribe;
    }

    function setSomeDayTodos() {
        setBgColor("#CCBFA3");
        const q = query(
            collection(db, "todo"),
            where("userId", "==", auth.currentUser?.uid),
            where("type", "==", TodoType.SOME_DAY)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todoList: any = [];
            querySnapshot.forEach((doc) => {
                todoList.push(doc);
            });
            const length = 10 - todoList.length;
            if (length > 0) {
                todoList.push({ tapToCreate: true });
                for (let index = 0; index < length - 1; index++) {
                    todoList.push({});
                }
            }
            setTodos(todoList);
        });

        return unsubscribe;
    }

    useEffect(() => {
        setLineColor("#C4C4C4");
        if (props.date.type === TodoType.DAILY) {
            setDailyTodos();
            return;
        }
        if (props.date.type === TodoType.SOME_DAY) {
            setSomeDayTodos();
            setLineColor("#8B816B");
            return;
        }
        setPreviousTodos();
    }, []);

    useEffect(() => {
        var date;
        if (props.date.type === TodoType.DAILY) {
            date = new Date(props.date.date);
            if (props.date.isToday) {
                setTitle(i18n.t("today"));
            } else {
                setTitle(i18n.t("nextDay"));
            }
        } else if (props.date.type === TodoType.SOME_DAY) {
            setTitle(i18n.t("someDay"));
            return;
        } else {
            date = props.date.date.toDate();
        }
        setDate(
            date.getDate() +
                "." +
                (date.getMonth() + 1) +
                "." +
                date.getFullYear()
        );
    }, [props.data]);

    const onOpen = (docRef: any) => {
        modalizeRef.current?.open();
        setSelectedDoc(docRef);
    };

    return (
        <View style={{ ...styles.container, backgroundColor: bgColor }}>
            <View
                style={{
                    flex: 0,
                    justifyContent: "space-between",
                    paddingRight: 16,
                    backgroundColor: bgColor,
                    ...styles.todoItemContainer,
                    borderColor: props.lineColor,
                    paddingVertical: 0,
                    paddingBottom: 20,
                }}
            >
                <MonoText style={{ fontSize: 16 }}>{title}</MonoText>
                <MonoText style={{ fontSize: 16 }}>{date}</MonoText>
            </View>
            {todos &&
                todos.map((todo: any, index: number) => {
                    return (
                        <TodoItem
                            onOpen={onOpen}
                            docRef={todo.ref}
                            tapToCreate={todo.tapToCreate}
                            todo={todo.data ? todo.data() : {}}
                            key={index}
                            index={index}
                            bgColor={bgColor}
                            lineColor={lineColor}
                        />
                    );
                })}
            <Portal>
                <Modalize modalHeight={420} ref={modalizeRef}>
                    <BottomModal
                        modalizeRef={modalizeRef}
                        docRef={selectedDoc}
                    />
                </Modalize>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingTop: 72,
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
        paddingVertical: 20,
    },
    button: {
        marginBottom: 4,
        marginLeft: 12,
    },
});
