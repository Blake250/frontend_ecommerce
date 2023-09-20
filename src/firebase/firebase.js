import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {GoogleAuthProvider, getAuth} from  "firebase/auth";
import {getStorage} from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyAeImeNQdGdkWfQpo2IG67euuEVZaI4x1s",
  authDomain: "todoapp-1d40e.firebaseapp.com",
  projectId: "todoapp-1d40e",
  storageBucket: "todoapp-1d40e.appspot.com",
  messagingSenderId: "734253400568",
  appId: "1:734253400568:web:053f55a5da52db3773960d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig)

 const auth = getAuth(firebaseApp);

 const db = getFirestore(firebaseApp);

 const storage = getStorage(firebaseApp);

const provider = new GoogleAuthProvider(firebaseApp);



export {auth, provider, storage}
export default db;