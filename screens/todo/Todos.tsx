import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { auth, db } from '../../firebase';
import { collection, query, where, onSnapshot, DocumentData, deleteDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import ConfirmDialog from '../../shared-components/ConfirmDialog';
import { closeConfirmDialog, openConfirmDialog } from '../../store/actions/global.actions';
import { CustomizedInput } from '../../components/CustomizedInput';
import { TodoStatus } from '../../store/enums/todoStatus';
import { TodoType } from '../../store/enums/todoType';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function TodoItem(props: any) {
  const dispatch = useDispatch();

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

  return(
    <View style={styles.todoItemContainer}>
      <Text style={{fontSize: 18}}>{props.todo.title}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={() => console.log()}>
          <Ionicons name="create-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(openConfirmDialog("Are you sure to delete the todo?", "Yes", () => deleteTodo(props.docRef)))}>
          <Ionicons name="trash-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function Todos(props: any) {
  const [todos, setTodos] = useState([]);
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
      setTodos(todoList);
  });

    return unsubscribe;
  }, [])
  
  return (
      <View style={styles.container}>
        {
          todos && todos.map((todo: any, index: number) => {
            return (
              <TodoItem docRef={todo.ref} todo={todo.data()} key={index} index={index}/>
            )
          }) 
        }
        {todos.length === 0 ? <Text>No todos here! Creat a todo with add button.</Text> : null}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
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
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    borderBottomWidth: 0.6,
    borderRadius: 4,
    marginBottom: 24
  },
  button: {
    marginBottom: 4,
    marginLeft: 12
  }
});
