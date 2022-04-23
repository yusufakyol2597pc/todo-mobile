import { SIGNIN_OR_SIGNUP_ENDED, SIGNIN_OR_SIGNUP_STARTED } from "../constants/global.constants";
import Toast from 'react-native-toast-message';
import { getAuth, createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase";

export function login(email, password) {
    return (dispatch, getState, api) => {
        dispatch({type: SIGNIN_OR_SIGNUP_STARTED})
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            /*Toast.show({
                type: 'success',
                text1: userCredential.user.email + ' signed in.'
            });*/
        })
        .catch((error) => {
            const errorMessage = error.message;
            Toast.show({
                type: 'error',
                text1: errorMessage
              });
        })
        .finally(() => {
            dispatch({type: SIGNIN_OR_SIGNUP_ENDED})
        });
      }
}

export function register(form) {
    return (dispatch, getState, api) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
            /*Toast.show({
                type: 'success',
                text1: 'Signed on.'
            });*/
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("error", error);
            Toast.show({
                type: 'error',
                text1: errorMessage
              });
            // ..
        })
        .finally(() => {
            dispatch({type: SIGNIN_OR_SIGNUP_ENDED})
        });
    }
}
