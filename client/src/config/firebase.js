import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAWQes1Wi44bEsa5RqCNb73niPnhO8vYDc",
    authDomain: "graduation-thesis-f9776.firebaseapp.com",
    projectId: "graduation-thesis-f9776",
    storageBucket: "graduation-thesis-f9776.appspot.com",
    messagingSenderId: "113378815874",
    appId: "1:113378815874:web:50d0a058db6a560901e99b",
    measurementId: "G-ZWRP8P166R",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
