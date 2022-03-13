import { useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import { Button, StyleSheet, TextInput, Pressable, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../store/actions/user.actions";
import { CustomizedInput } from "../../components/CustomizedInput";

function Signup(props) {
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          username: '',
          email: '',
          password: '',
          password_confirm: ''
        }
    });

    const onSubmit = data => {
        dispatch(register(data))
    };   
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.title1}>
                <Text>Already have an account?</Text>
                <Text style={{fontWeight: "bold"}} onPress={props.setHaveAccount}> Sign in</Text>
            </Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <CustomizedInput name="username" placeholder="Username" control={control} errors={errors} icon="person-circle"/>
            <CustomizedInput name="email" placeholder="Email" control={control} errors={errors} icon="mail"/>
            <CustomizedInput name="password" placeholder="Password" secureTextEntry={true} control={control} errors={errors} icon="key"/>
            <CustomizedInput name="password_confirm" placeholder="Confirm Password" secureTextEntry={true} control={control} errors={errors} icon="key"/>

            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={{color: "white", fontSize: 18}}>Create Account</Text>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

function Signin(props) {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.global);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          email: '',
          password: '',
        }
    });
    
    const onSubmit = data => {
        dispatch(login(data.email, data.password))
    };  
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.title1}>
                <Text>Does not have an account?</Text>
                <Text style={{fontWeight: "bold"}} onPress={props.setHaveAccount}> Sign up</Text>
            </Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            
            <CustomizedInput name="email" placeholder="Email" control={control} errors={errors} icon="mail"/>
            <CustomizedInput name="password" placeholder="Password" secureTextEntry={true} control={control} errors={errors} icon="key"/>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={{color: "white", fontSize: 18}}>Sign in</Text>
            </TouchableOpacity>
            {loading ? <ActivityIndicator/> : null}
        </KeyboardAvoidingView>
    )
}

export default function () {
    const [haveAccount, setHaveAccount] = useState(true);
    
    if (haveAccount) {
        return (
            <Signin setHaveAccount={() => setHaveAccount(false)}/>
        )
    }
    return (
        <Signup setHaveAccount={() => setHaveAccount(true)}/>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 2,
      width: '80%',
    },
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
        marginLeft: 10,
        width: "100%"
    },
    button: {
        width: "100%",
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#398AB9',
    }
  });