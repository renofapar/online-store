// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZLjSmMVhaeVgBzhLVNqvrZ4Fxyu1ZwuU",
  authDomain: "books-store-39fe4.firebaseapp.com",
  databaseURL: "https://books-store-39fe4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "books-store-39fe4",
  storageBucket: "books-store-39fe4.appspot.com",
  messagingSenderId: "960019781281",
  appId: "1:960019781281:web:70be6b792befa09bbc82e0",
  measurementId: "G-CX657HZVB8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)