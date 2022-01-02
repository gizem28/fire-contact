import {initializeApp} from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyABQBVLFB_9PYywBuXIdZWBBOEyVl4kjz0",
    authDomain: "fire-contact-20d5c.firebaseapp.com",
    databaseURL: "https://fire-contact-20d5c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fire-contact-20d5c",
    storageBucket: "fire-contact-20d5c.appspot.com",
    messagingSenderId: "749499650048",
    appId: "1:749499650048:web:a22a42c0be15cb0a6808e5"
  };

const firebase=initializeApp(firebaseConfig);
export default firebase;