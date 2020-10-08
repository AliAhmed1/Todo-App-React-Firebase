import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyAwEVH24d9YUQ3xCgBhxkkWHeUSmSUDFiY",
    authDomain: "todoapp-7d928.firebaseapp.com",
    databaseURL: "https://todoapp-7d928.firebaseio.com",
    projectId: "todoapp-7d928",
    storageBucket: "todoapp-7d928.appspot.com",
    messagingSenderId: "1086961553388",
    appId: "1:1086961553388:web:cd27be86e764ae9e2efac9"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);