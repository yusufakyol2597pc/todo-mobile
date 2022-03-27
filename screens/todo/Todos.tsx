import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, View } from '../../components/Themed';
import { auth, db } from '../../firebase';
import { collection, query, where, onSnapshot, DocumentData, deleteDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { closeConfirmDialog, openConfirmDialog } from '../../store/actions/global.actions';
import { TodoStatus } from '../../store/enums/todoStatus';
import { TodoType } from '../../store/enums/todoType';
import { useForm } from 'react-hook-form';
import { MonoText } from '../../components/StyledText';
import { SvgXml } from 'react-native-svg';
import { Modalize } from 'react-native-modalize';
import { Host, Portal } from 'react-native-portalize';
import { appointmentIcon, completedIcon, delegateIcon, emptyIcon, inProgressIcon } from './SvgIcons';
import BottomModal from './BottomModal';
import { CustomizedInput } from '../../components/CustomizedInput';

function TodoItem(props: any) {
  const [create, setCreate] = useState(false);
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      todoTitle: ''
    }
});

  function deleteTodo(docRef: any) {
    dispatch(closeConfirmDialog());
    deleteDoc(docRef)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: "Todo is deleted."
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      Toast.show({
          type: 'error',
          text1: errorMessage
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

  return(
    <View style={styles.todoItemContainer}>
      <TouchableOpacity>
        <SvgXml onPress={() => props.onOpen(props.docRef)} style={{marginRight: 16}} xml={getIcon(props.todo.status)}/>
      </TouchableOpacity>
      {
        props.todo.title ? <MonoText>{props.todo.title}</MonoText> : null
      }
      {
        props.tapToCreate ? 
        create ? 
        <TextInput onChangeText={() => console.log("asda")}/>
        :
        <Text onPress={() => setCreate(true)} style={{opacity: 0.3, fontSize: 16, fontStyle: "italic"}}>Tap to add something</Text> 
        : 
        <Text></Text>
      }
    </View>
  )
}

export default function Todos(props: any) {
  const modalizeRef = useRef<Modalize>(null);
  const [todos, setTodos] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      status: TodoStatus.NOT_STARTED,
      type: TodoType.TODAY,
      date: new Date()
    }
  });
  useEffect(() => {
      const q = query(collection(db, "todo"), where("userId", "==", auth.currentUser?.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const todoList: any = [];
          querySnapshot.forEach((doc) => {
          todoList.push(doc);
      });
      const length = 10 - todoList.length;
      if (length > 0) {
        todoList.push({tapToCreate: true});
        for (let index = 0; index < length - 1; index++) {
          todoList.push({});
        }
      }
      setTodos(todoList);
  });

    return unsubscribe;
  }, [])

  const onOpen = (docRef: any) => {
    modalizeRef.current?.open();
    setSelectedDoc(docRef);
  };
  
  return (
      <View style={styles.container}>
        {
          todos && todos.map((todo: any, index: number) => {
            return (
              <TodoItem onOpen={onOpen} docRef={todo.ref} tapToCreate={todo.tapToCreate} todo={todo.data? todo.data(): {}} key={index} index={index}/>
            )
          }) 
        }
        {todos.length === 0 ? <Text>No todos here! Creat a todo with add button.</Text> : null}
        <Portal>
          <Modalize modalHeight={420} ref={modalizeRef}>
            <BottomModal modalizeRef={modalizeRef} docRef={selectedDoc}/>
          </Modalize>
        </Portal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 16,
    paddingVertical: 32
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  todoItemContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 4,
    borderBottomWidth: 0.3,
    borderColor: "#C4C4C4",
    paddingVertical: 20
  },
  button: {
    marginBottom: 4,
    marginLeft: 12
  }
});
