import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCZO8blEJc8A0KoppOoR7J2C3jrJuenSIw",
  authDomain: "snapchat-clone-ce487.firebaseapp.com",
  projectId: "snapchat-clone-ce487",
  storageBucket: "snapchat-clone-ce487.appspot.com",
  messagingSenderId: "578362209914",
  appId: "1:578362209914:web:01987cf5e392399244edc3",
  measurementId: "G-5DJ1TLNVW1"
};


const firebaseApp= firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, storage, provider};



