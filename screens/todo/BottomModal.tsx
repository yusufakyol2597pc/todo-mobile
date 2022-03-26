import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { MonoText } from '../../components/StyledText';
import { SvgXml } from 'react-native-svg';
import { appointmentIcon, cancelIcon, completedIcon, delegateIcon, editIcon, inProgressIcon, moveIcon } from './SvgIcons';
import { updateDoc } from 'firebase/firestore';
import { TodoStatus } from '../../store/enums/todoStatus';

export default function BottomModal(props: any) {

    async function updateDocument(status: TodoStatus) {
        if (!props.docRef || !status) {
            return;
        }

        props.modalizeRef.current?.close();

        await updateDoc(props.docRef, {
            status: status
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.todoItemContainer} onPress={() => updateDocument(TodoStatus.COMPLETED)}>
                <SvgXml onPress={props.onOpen} style={{marginRight: 16}} xml={completedIcon}/>
                <MonoText>Complete</MonoText> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.todoItemContainer} onPress={() => updateDocument(TodoStatus.IN_PROGRESS)}>
                <SvgXml onPress={props.onOpen} style={{marginRight: 16}} xml={inProgressIcon}/>
                <MonoText>In progress</MonoText> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.todoItemContainer} onPress={() => updateDocument(TodoStatus.DELEGATED)}>
                <SvgXml onPress={props.onOpen} style={{marginRight: 16}} xml={delegateIcon}/>
                <MonoText>Delegated</MonoText> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.todoItemContainer} onPress={() => updateDocument(TodoStatus.APPOINTMENT)}>
                <SvgXml onPress={props.onOpen} style={{marginRight: 16}} xml={appointmentIcon}/>
                <MonoText>Appointment</MonoText> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.todoItemContainer}>
                <SvgXml onPress={props.onOpen} style={{marginRight: 16}} xml={moveIcon}/>
                <MonoText>Move</MonoText> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.todoItemContainer}>
                <SvgXml onPress={props.onOpen} style={{marginRight: 16}} xml={editIcon}/>
                <MonoText>Edit</MonoText> 
            </TouchableOpacity>
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