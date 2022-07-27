import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCLcKUAhYzdYj1xiaIbMZfWOSuScyTjsqw",
    authDomain: "todolist-v2-june2022.firebaseapp.com",
    databaseURL: "https://todolist-v2-june2022-default-rtdb.firebaseio.com",
    projectId: "todolist-v2-june2022",
    storageBucket: "todolist-v2-june2022.appspot.com",
    messagingSenderId: "639371117110",
    appId: "1:639371117110:web:3551ce21ee12c5bbabce97",
});
export { firebaseConfig as firebase };
