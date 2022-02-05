import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

/*const firebaseConfigTest = {
    apiKey: "AIzaSyDjkWh5PoZYYg0fOPeKDkpQOJ-tXTHOA8E",
    authDomain: "mylogin-ecbd3.firebaseapp.com",
    databaseURL: "https://mylogin-ecbd3.firebaseio.com",
    projectId: "mylogin-ecbd3",
    storageBucket: "mylogin-ecbd3.appspot.com",
    messagingSenderId: "112066380939",
    appId: "1:112066380939:web:aa2bab60c15dbabe14408e"
};*/

/*if (process.env.NODE_ENV === 'test') {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfigTest);
} else {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}*/

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}