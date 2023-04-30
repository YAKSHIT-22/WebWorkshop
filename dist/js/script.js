  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDKJC4ou1lzT8ZUvTIBWpQfYqaABTgX8kw",
    authDomain: "webworkshop-318cd.firebaseapp.com",
    projectId: "webworkshop-318cd",
    storageBucket: "webworkshop-318cd.appspot.com",
    messagingSenderId: "963208306797",
    appId: "1:963208306797:web:d67bc8b422209c5dd09f64"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = firebase.firestore;

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const c_password = document.getElementById("c_password");

