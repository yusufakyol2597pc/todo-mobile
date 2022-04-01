import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomizedInput } from '../components/CustomizedInput';
import { Text, View } from '../components/Themed';
import { auth } from '../firebase';
import { TodoStatus } from '../store/enums/todoStatus';
import { TodoType } from '../store/enums/todoType';
import { Todo } from '../store/classes/todo';
import { useNavigation } from '@react-navigation/native';

export default function ModalScreen() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        title: '',
        status: TodoStatus.NOT_STARTED,
        type: TodoType.DAILY,
        date: new Date()
      }
  });

  function onCreateTodo(data: any) {
    console.log("data", data);
    
      const todo = new Todo(data.title);
      todo.save();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Todo</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <CustomizedInput name="title" placeholder="Title" control={control} errors={errors} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onCreateTodo)}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
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
  button: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#398AB9',
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
