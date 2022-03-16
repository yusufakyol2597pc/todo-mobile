import axios from "axios";
import { SIGNIN_OR_SIGNUP_ENDED, SIGNIN_OR_SIGNUP_STARTED } from "../constants/global.constants";
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase";

export function login(email, password) {
    return (dispatch, getState, api) => {
        dispatch({type: SIGNIN_OR_SIGNUP_STARTED})
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            Toast.show({
                type: 'success',
                text1: userCredential.user.email + ' signed in.'
            });
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
        createUserWithEmailAndPassword(auth, form.email, form.pasword)
        .then((userCredential) => {
            Toast.show({
                type: 'success',
                text1: 'Signed on.'
            });
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
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

export function signinWithGoogle() {
    return (dispatch, getState, api) => {
        dispatch({type: SIGNIN_OR_SIGNUP_STARTED})
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            Toast.show({
                type: 'success',
                text1: user.email + ' signed in.'
            });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            Toast.show({
                type: 'error',
                text1: errorMessage
              });
            // ...
        }).finally(() => {
            dispatch({type: SIGNIN_OR_SIGNUP_ENDED})
        });
      }
}