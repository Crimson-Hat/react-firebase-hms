import firebase from "firebase";

const firebaseConfig = {

  apiKey: "AIzaSyDGWCg8jJ43WdaaYzwNhJVpSKBUGAm3Llc",

  authDomain: "spital-c588d.firebaseapp.com",

  projectId: "spital-c588d",

  storageBucket: "spital-c588d.appspot.com",

  messagingSenderId: "149322227960",

  appId: "1:149322227960:web:dd489ebcb6aeb24d135b0d",

  measurementId: "G-5JXQ2ZP172"

};


// const db = firebaseApp.firestore();
// const storage = firebaseApp.storage();
firebase.initializeApp(config);
export default firebase;
