import Swal from 'sweetalert2';
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui";
import { notesLogoutClening } from './notes';

export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {
        dispatch(startLoading());
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.email));
                dispatch(finishLoading());
            })
            .catch(err => {
                dispatch(finishLoading());
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error');
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

// esto es una accion
//esto es lo mismo que abajo, al encerrar con parentesis el objeto, le decimos que lo estamos retornando
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


/*export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}*/

export const startLogout = () => {
    return async (dispatch) => {

        await firebase.auth().signOut();    

        dispatch(logout());  
        
        dispatch(notesLogoutClening());

    }
}

export const logout = () => ({
    type: types.logout
})