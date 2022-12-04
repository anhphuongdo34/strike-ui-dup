import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "<project-id>.firebaseapp.com",
    databaseURL: "https://<database-name>.firebaseio.com",
    projectId: "<project-id>",
    storageBucket: "<project-id>.appspot.com",
    messagingSenderId: "xxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    measurementId: "G-xxxxxxxx"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const endPoint = "<server-url>"