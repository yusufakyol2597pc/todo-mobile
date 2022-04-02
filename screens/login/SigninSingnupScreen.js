import { useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import { Button, StyleSheet, TextInput, Pressable, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, register, signinWithGoogle } from "../../store/actions/user.actions";
import { CustomizedInput } from "../../components/CustomizedInput";
import { MonoText } from "../../components/StyledText";
import { useTranslation } from "react-i18next";

function Signup(props) {
    const { t, i18n } = useTranslation();
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
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={64}>
            <MonoText style={styles.title}>Digital</MonoText>
            <MonoText>{i18n.t('createAccount')}</MonoText>

            <View style={{backgroundColor: '#F1EADE', marginTop: 24}}>
                <MonoText style={{marginBottom: 4}}>Email</MonoText>
                <CustomizedInput name="email" control={control} icon="mail" borderColor="#DFD4C0" bgColor="#F0E7D6"/>
            </View>

            <View style={{backgroundColor: '#F1EADE', marginVertical: 24}}>
                <MonoText style={{marginBottom: 4}}>{i18n.t('password')}</MonoText>
                <CustomizedInput name="password" secureTextEntry={true} control={control} icon="key" borderColor="#DFD4C0" bgColor="#F0E7D6"/>
            </View>

            <View style={{backgroundColor: '#F1EADE', marginBottom: 16}}>
                <MonoText style={{marginBottom: 4}}>{i18n.t('confirmPassword')}</MonoText>
                <CustomizedInput name="password-confirm" secureTextEntry={true} control={control} icon="key" borderColor="#DFD4C0" bgColor="#F0E7D6"/>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <MonoText style={{color: "white", fontSize: 18}}>{i18n.t('signup')}</MonoText>
            </TouchableOpacity>

            <MonoText style={{marginVertical: 24, textDecorationLine: 'underline'}} onPress={props.setHaveAccount}>{i18n.t('alreadyHave')}</MonoText>
        </KeyboardAvoidingView>
    )
}

function Signin(props) {
    const { t, i18n } = useTranslation();
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
    const handleSigninWithGoogle = () => {
        dispatch(signinWithGoogle())
    };  

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <MonoText style={styles.title}>Digital</MonoText>
            <MonoText>{i18n.t('login')}</MonoText>
            
            <View style={{backgroundColor: '#F1EADE', marginVertical: 24}}>
                <MonoText style={{marginBottom: 4}}>Email</MonoText>
                <CustomizedInput name="email" control={control} icon="mail" borderColor="#DFD4C0" bgColor="#F0E7D6"/>
            </View>
            
            {errors.email && <Text style={styles.errorText}>Email is required.</Text>}

            <View style={{backgroundColor: '#F1EADE', marginBottom: 16}}>
                <MonoText style={{marginBottom: 4}}>{i18n.t('password')}</MonoText>
                <CustomizedInput name="password" secureTextEntry={true} control={control} icon="key" borderColor="#DFD4C0" bgColor="#F0E7D6"/>
            </View>
            {errors.password && <Text style={styles.errorText}>Password is required.</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <MonoText style={{color: "white", fontSize: 18}}>{i18n.t('login')}</MonoText>
            </TouchableOpacity>

            <MonoText style={{marginVertical: 24, textDecorationLine: 'underline'}}>{i18n.t('forgotPassword')}</MonoText>

            <MonoText style={{textDecorationLine: 'underline'}} onPress={props.setHaveAccount}>{i18n.t('newHere')}</MonoText>

            {loading ? <ActivityIndicator style={{marginTop: 16}}/> : null}
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
      paddingVertical: 16,
      paddingHorizontal: 42,
      backgroundColor: '#F1EADE'
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 12
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
        borderRadius: 24,
        elevation: 3,
        backgroundColor: '#38383A',
        marginTop: 16
    },
    errorText: {
        textAlign: "left",
        color: "red",
        width: "100%",
        marginTop: 4
    }
  });