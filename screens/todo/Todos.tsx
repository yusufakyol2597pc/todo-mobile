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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { TodoDay } from "../../store/enums/todoDay";

function getLastIndex(todoList): number {
    let index = 0;
    if (todoList.length == 0) {
        return index;
    }
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].tapToCreate) {
            return index;
        }
        if (todoList[i].data && todoList[i].data().index) {
            index = todoList[i].data().index;
        }
    }
    return index;
}

function TodoItem(props: any) {
    const { t, i18n } = useTranslation();
    const [create, setCreate] = useState(false);
    const [todoTitleBackup, setTodoTitleBackup] = useState(
        props.todo.title ? props.todo.title : ""
    );
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

    useState(() => {
        if (props.tapToCreate) {
            setTodoTitle("");
            setTodoTitleBackup("");
            return;
        }
        if (props.todo.title) {
            setTodoTitle(props.todo.title);
            setTodoTitleBackup(props.todo.title);
        } else {
            setTodoTitle("");
            setTodoTitleBackup("");
        }
    }, [props]);

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
        let trimedTitle = todoTitle.trim();
        if (trimedTitle === "") {
            setCreate(false);
            setTodoTitle("");
            return;
        }
        var date;
        var todo;
        if (props.type === TodoType.SOME_DAY) {
            todo = new Todo(
                trimedTitle,
                TodoStatus.NOT_STARTED,
                TodoType.SOME_DAY,
                new Date(),
                getLastIndex(props.todoList) + 1
            );
        } else if (props.type === TodoType.DAILY) {
            if (props.isToday) {
                date = new Date();
            } else {
                date = new Date();
                date.setDate(date.getDate() + 1);
            }
            todo = new Todo(
                trimedTitle,
                TodoStatus.NOT_STARTED,
                TodoType.DAILY,
                date,
                getLastIndex(props.todoList) + 1
            );
        } else {
            date = props.date.toDate();
            todo = new Todo(
                trimedTitle,
                TodoStatus.NOT_STARTED,
                TodoType.DAILY,
                date,
                getLastIndex(props.todoList) + 1
            );
        }
        todo.save()
            .then(() => {
                setTodoTitleBackup(trimedTitle);
                setCreate(false);
            })
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });

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
        let trimedTitle = todoTitle.trim();
        if (trimedTitle.length === 0 || todoTitleBackup === trimedTitle) {
            props.setEditFunc(false);
            setTodoTitle(todoTitleBackup);
            return;
        }
        updateDoc(props.docRef, {
            title: trimedTitle,
        })
            .then(() => {
                props.setEditFunc(false);
                setTodoTitleBackup(trimedTitle);
            })
            .catch((error) => {
                const errorMessage = error.message;
                Toast.show({
                    type: "error",
                    text1: errorMessage,
                });
            });
    }

    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: props.bgColor,
                alignItems: "center",
                // bugfix workaround
                //borderTopWidth: props.index == 6 ? 0.3 : 0,
            }}
        >
            <TouchableOpacity
                style={{ backgroundColor: props.bgColor, marginTop: 1 }}
                onPress={
                    props.id && !props.tapToCreate
                        ? () =>
                              props.onTodoSelected(true, props.docRef, props.id)
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
                        backgroundColor: props.bgColor,
                        width: "85%",
                    }}
                    onPress={() => {
                        props.setEditFunc(true);
                        props.onTodoSelected(false, props.docRef, props.id);
                    }}
                >
                    {props.todo.title}
                </MonoText>
            ) : null}
            {props.tapToCreate ? (
                create ? (
                    <TextInput
                        autoFocus={true}
                        value={todoTitle}
                        onChangeText={(value) => {
                            if (value.length < 30) {
                                setTodoTitle(value);
                            } else {
                                setTodoTitle(value.substring(0, 29));
                            }
                        }}
                        onEndEditing={() => createTodo()}
                        style={{
                            width: "88%",
                            fontSize: 18,
                            fontFamily: "pressura-mono",
                            backgroundColor: props.bgColor,
                        }}
                    />
                ) : (
                    <MonoText
                        onPress={() => setCreate(true)}
                        style={{
                            fontSize: 18,
                            fontFamily: "pressura-mono",
                            opacity: 0.3,
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
                        } else {
                            setTodoTitle(value.substring(0, 29));
                        }
                    }}
                    onEndEditing={() => editTodo()}
                    style={{
                        width: "88%",
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
    const [day, setDay] = useState(TodoDay.TODAY);
    const [date, setDate] = useState("");
    const [bgColor, setBgColor] = useState("#FFFEFE");
    const [lineColor, setLineColor] = useState("#C4C4C4");
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

    async function setDailyTodos() {
        setDay(TodoDay.TODAY);
        if (!props.date.isToday) {
            setBgColor("#F1EADE");
            setDay(TodoDay.NEXT_DAY);
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
            todoList.sort(orderByIndex);
            setTodos(todoList);
        });

        return unsubscribe;
    }

    function setPreviousTodos() {
        setDay(TodoDay.PREVIOUS);
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
                for (let index = 0; index < length; index++) {
                    todoList.push({});
                }
            }
            todoList.sort(orderByIndex);
            setTodos(todoList);
        });

        return unsubscribe;
    }

    function setSomeDayTodos() {
        setBgColor("#CCBFA3");
        setDay(TodoDay.SOME_DAY);
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
            todoList.sort(orderByIndex);
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

    const onTodoSelected = (open: boolean, docRef: any, id: any) => {
        if (open) {
            modalizeRef.current?.open();
        }
        setSelectedDoc(docRef);
        setSelectedId(id);
    };

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

    return (
        <View style={{ ...styles.container, backgroundColor: bgColor }}>
            <View
                style={{
                    flex: 0,
                    justifyContent: "space-between",
                    paddingRight: 16,
                    backgroundColor: bgColor,
                    ...styles.todoItemContainer,
                    borderColor: lineColor,
                    paddingVertical: 0,
                    paddingBottom: 20,
                }}
            >
                <MonoText style={{ fontSize: 16 }}>{i18n.t(title)}</MonoText>
                <MonoText style={{ fontSize: 16 }}>{date}</MonoText>
            </View>
            <KeyboardAwareScrollView>
                {todos &&
                    todos.map((todo: any, index: number) => {
                        return (
                            <View
                                key={Math.floor(Math.random() * 10000000000)}
                                style={{
                                    ...styles.todoItemContainer,
                                    backgroundColor: props.bgColor,
                                    borderBottomColor: lineColor,
                                    // bugfix workaround
                                    //borderTopWidth: props.index == 6 ? 0.3 : 0,
                                }}
                            >
                                <TodoItem
                                    onTodoSelected={onTodoSelected}
                                    docRef={todo.ref}
                                    tapToCreate={todo.tapToCreate}
                                    todo={todo.data ? todo.data() : {}}
                                    index={index}
                                    todoList={todos}
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
                            </View>
                        );
                    })}
            </KeyboardAwareScrollView>
            <Portal>
                <BottomModal
                    modalizeRef={modalizeRef}
                    docRef={selectedDoc}
                    day={day}
                    setEditFunc={(e: any) => {
                        setEdit(e);
                    }}
                />
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
        height: 64,
        //paddingVertical: 21,
    },
    button: {
        marginBottom: 4,
        marginLeft: 12,
    },
});
