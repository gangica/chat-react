import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC8jyj1l52t4gVLr7HErhqiU_fzaSitiUU",
    authDomain: "chat-react-d0fd8.firebaseapp.com",
    databaseURL: "https://chat-react-d0fd8.firebaseio.com",
    projectId: "chat-react-d0fd8",
    storageBucket: "chat-react-d0fd8.appspot.com",
    messagingSenderId: "559683069787",
    appId: "1:559683069787:web:c8a46d8722bc20e2f31c7e"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;