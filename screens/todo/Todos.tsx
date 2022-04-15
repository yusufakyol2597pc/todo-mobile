import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { auth, db } from "../../firebase";
import {
    collection,
    query,
    where,
    onSnapshot,
    DocumentData,
    deleteDoc,
    orderBy,
    getDocs,
    addDoc,
    updateDoc,
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
import { Todo } from "../../store/classes/todo";

function TodoItem(props: any) {
    const { t, i18n } = useTranslation();
    const [create, setCreate] = useState(false);
    const [todoTitle, setTodoTitle] = useState(
        props.todo.title ? props.todo.title : ""
    );
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            todoTitle: "",
        },
    });

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

    function createTodo() {
        if (todoTitle === "") {
            setCreate(false);
            return;
        }
        var date;
        var todo;
        if (props.type === TodoType.SOME_DAY) {
            todo = new Todo(
                todoTitle,
                TodoStatus.NOT_STARTED,
                TodoType.SOME_DAY,
                new Date()
            );
        } else if (props.type === TodoType.DAILY) {
            if (props.isToday) {
                date = new Date();
            } else {
                date = new Date();
                date.setDate(date.getDate() + 1);
            }
            todo = new Todo(
                todoTitle,
                TodoStatus.NOT_STARTED,
                TodoType.DAILY,
                date
            );
        } else {
            date = props.date.toDate();
            todo = new Todo(
                todoTitle,
                TodoStatus.NOT_STARTED,
                TodoType.DAILY,
                date
            );
        }
        todo.save();
        setCreate(false);
        setTodoTitle("");

        if (date) {
            date.setHours(0, 0, 0, 0);
            var dateEnd = new Date(date);
            dateEnd.setHours(23, 59, 59, 100);
            const q = query(
                collection(db, "dates"),
                where("userId", "==", auth.currentUser?.uid),
                where("date", "<=", dateEnd),
                where("date", ">=", date)
            );

            getDocs(q)
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length === 0) {
                        addDoc(collection(db, "dates"), {
                            date: date,
                            userId: auth.currentUser?.uid,
                        });
                    }
                })
                .catch((e) => {});
        }
    }

    function editTodo() {
        updateDoc(props.docRef, {
            title: todoTitle,
        })
            .then(() => {})
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
        props.setEditFunc(false);
    }

    return (
        <View
            style={{
                ...styles.todoItemContainer,
                backgroundColor: props.bgColor,
                borderColor: props.lineColor,
            }}
        >
            <TouchableOpacity
                onPress={
                    props.todo.title
                        ? () => props.onOpen(props.docRef, props.id)
                        : undefined
                }
            >
                <SvgXml
                    style={{ marginRight: 16 }}
                    xml={getIcon(props.todo.status)}
                />
            </TouchableOpacity>
            {!props.edit && props.todo.title ? (
                <MonoText
                    style={{
                        fontSize: 18,
                    }}
                >
                    {props.todo.title}
                </MonoText>
            ) : null}
            {props.tapToCreate ? (
                create ? (
                    <TextInput
                        autoFocus={true}
                        onChangeText={(value) => {
                            if (value.length < 30) {
                                setTodoTitle(value);
                            }
                        }}
                        onEndEditing={() => createTodo()}
                        style={{
                            width: "80%",
                            fontSize: 18,
                            fontFamily: "pressura-mono",
                        }}
                    />
                ) : (
                    <MonoText
                        onPress={() => setCreate(true)}
                        style={{
                            opacity: 0.3,
                            fontSize: 18,
                        }}
                    >
                        {i18n.t("tapToAddSomething")}
                    </MonoText>
                )
            ) : props.edit ? (
                <TextInput
                    autoFocus={true}
                    value={todoTitle}
                    onChangeText={(value) => {
                        if (value.length < 30) {
                            setTodoTitle(value);
                        }
                    }}
                    onEndEditing={() => editTodo()}
                    style={{
                        width: "80%",
                        fontSize: 18,
                        fontFamily: "pressura-mono",
                    }}
                />
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
    const [selectedId, setSelectedId] = useState(null);
    const [edit, setEdit] = useState(false);
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

        var q = query(
            collection(db, "todo"),
            where("type", "==", TodoType.DAILY),
            where("userId", "==", auth.currentUser?.uid),
            orderBy("date", "asc"),
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
            where("type", "==", TodoType.DAILY),
            where("userId", "==", auth.currentUser?.uid),
            orderBy("date", "asc"),
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
            where("type", "==", TodoType.SOME_DAY),
            orderBy("date", "asc")
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
            return setDailyTodos();
        }
        if (props.date.type === TodoType.SOME_DAY) {
            setLineColor("#8B816B");
            return setSomeDayTodos();
        }
        return setPreviousTodos();
    }, []);

    useEffect(() => {
        var date;
        if (props.date.type === TodoType.DAILY) {
            date = new Date(props.date.date);
            if (props.date.isToday) {
                setTitle("today");
            } else {
                setTitle("nextDay");
            }
        } else if (props.date.type === TodoType.SOME_DAY) {
            setTitle("someDay");
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

    const onOpen = (docRef: any, id: any) => {
        modalizeRef.current?.open();
        setSelectedDoc(docRef);
        setSelectedId(id);
    };

    return (
        <KeyboardAvoidingView
            style={{ ...styles.container, backgroundColor: bgColor }}
        >
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
                <MonoText style={{ fontSize: 16 }}>{i18n.t(title)}</MonoText>
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
                            id={todo.id}
                            bgColor={bgColor}
                            lineColor={lineColor}
                            type={props.date.type}
                            isToday={props.date.isToday}
                            date={props.date.date}
                            edit={selectedId == todo.id ? edit : false}
                            setEditFunc={(e: any) => {
                                setEdit(e);
                            }}
                        />
                    );
                })}
            <Portal>
                <BottomModal
                    modalizeRef={modalizeRef}
                    docRef={selectedDoc}
                    cardTitle={title}
                    setEditFunc={(e: any) => {
                        setEdit(e);
                    }}
                />
            </Portal>
        </KeyboardAvoidingView>
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
