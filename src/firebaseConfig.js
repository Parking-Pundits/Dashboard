// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyB3qUPj3eEwLcPnOngYv7DCtVF0DZATJdQ",
  authDomain: "jalsanrakshan.firebaseapp.com",
  projectId: "jalsanrakshan",
  databaseURL: "https://jalsanrakshan-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "jalsanrakshan.appspot.com",
  messagingSenderId: "242091814600",
  appId: "1:242091814600:web:19e84d139121aea749fffd",
  measurementId: "G-R6G1YCWCMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
export { database, storage };

