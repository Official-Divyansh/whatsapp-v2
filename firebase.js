import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCbWzF3Vl7BhrMDQJn70CIxbU4Y4jySwSI",
  authDomain: "chat-application-8a9e8.firebaseapp.com",
  projectId: "chat-application-8a9e8",
  storageBucket: "chat-application-8a9e8.appspot.com",
  messagingSenderId: "39529834951",
  appId: "1:39529834951:web:64ca4c9d479b7e1b8651e2"
};

// Initialize Firebase
const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig)
: firebase.app()

const db = firebase.firestore()
const auth = app.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth,provider}