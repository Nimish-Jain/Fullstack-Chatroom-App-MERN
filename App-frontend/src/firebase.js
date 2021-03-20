import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDHQmSYpnQf18GUo0YooTMXua_u7TIjqKI",
  authDomain: "fullstack-chatroom-mern.firebaseapp.com",
  projectId: "fullstack-chatroom-mern",
  storageBucket: "fullstack-chatroom-mern.appspot.com",
  messagingSenderId: "170391712364",
  appId: "1:170391712364:web:055adccb3ed01a9c0e1e49",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
// export default db;
