import firebase from "firebase";

const config = {
    apiKey: "AIzaSyD2TIX5-Mog2oMjGwFzfHVe74jZ3FH2fzE",
    authDomain: "minchospital.firebaseapp.com",
    projectId: "minchospital",
    storageBucket: "minchospital.appspot.com",
    messagingSenderId: "837913718448",
    appId: "1:837913718448:web:33f7717aebc42e382e9575",
    measurementId: "G-52RS16T5VZ"
};

// const db = firebaseApp.firestore();
// const storage = firebaseApp.storage();
firebase.initializeApp(config);
export default firebase;