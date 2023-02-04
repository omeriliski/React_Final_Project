// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// require('dotenv').config()
// dotenv.config();
// const {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID
// } = process.env;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABlvOaZ37ml2FBnDLpQjkDbrfUpFIWxxY",
  authDomain:"reactfinalproject-27b44.firebaseapp.com",
  projectId: "reactfinalproject-27b44",
  storageBucket: "reactfinalproject-27b44.appspot.com",
  messagingSenderId:"265940644819",
  appId: "1:265940644819:web:ce1c2f65d4ff1f694f7526"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);