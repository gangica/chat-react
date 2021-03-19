import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC8jyj1l52t4gVLr7HErhqiU_fzaSitiUU",
    authDomain: "chat-react-d0fd8.firebaseapp.com",
    databaseURL: "https://chat-react-d0fd8.firebaseio.com",
    projectId: "chat-react-d0fd8",
    storageBucket: "chat-react-d0fd8.appspot.com",
    messagingSenderId: "559683069787",
    appId: "1:559683069787:web:c8a46d8722bc20e2f31c7e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;