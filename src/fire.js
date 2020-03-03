import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB0j1NJjzuLlYPZnH5B_269-X9Y-uwYthw",
    authDomain: "temple-admin.firebaseapp.com",
    databaseURL: "https://temple-admin.firebaseio.com",
    projectId: "temple-admin",
    storageBucket: "temple-admin.appspot.com",
    messagingSenderId: "485531884758",
    appId: "1:485531884758:web:22c8fc67731f4b3d277d77",
    measurementId: "G-21RWTSVLDT"
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;