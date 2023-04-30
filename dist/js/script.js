import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
      import {
        getAuth,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithPopup,
        sendPasswordResetEmail,
        updateProfile,
        sendEmailVerification,
        onAuthStateChanged,
        getIdToken,
      } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
      import {
        getFirestore,
        collection,
        addDoc,
      } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

      const firebaseConfig = {
        apiKey: "AIzaSyAQJJGxJ5DaimJDAb2oH0qIpxlq3U_lY7I",
        authDomain: "webworkshop-f9c35.firebaseapp.com",
        projectId: "webworkshop-f9c35",
        storageBucket: "webworkshop-f9c35.appspot.com",
        messagingSenderId: "316628480123",
        appId: "1:316628480123:web:9134b2fa30b3b0fb39b2de",
      };

      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);

      const auth = getAuth(app);

      const googleProvider = new GoogleAuthProvider();

      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const c_password = document.getElementById("c_password");

      const login = async () => {
        await signInWithEmailAndPassword(auth, email.value, password.value)
          .then(async (userCredential) => {
            console.log("Login Successful");
            //window.location.href = "/dashboard";
          })
          .catch((err) => console.log(`Login Error\n\t${err}`));
      };

      const register = async () => {
        if (password.value !== c_password.value) {
          alert("Password and Confirm Password does not match");
          return;
        }

        await createUserWithEmailAndPassword(auth, email.value, password.value)
          .then(async (userCredential) => {
            await addData({
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,
              password: password.value,
            });
           await sendVerificationEmail(userCredential.user);
            await updateProfile(userCredential.user, {
              displayName: `${firstName.value} ${lastName.value}`,
            });
            console.log("Register Successful");
            //window.location.href = "/dashboard";
          })
          .catch((err) => console.log(`Register Error\n\t${err}`));
      };

      const googleLogin = async () => {
        await signInWithPopup(auth, googleProvider)
          .then((userCredential) => {
            console.log("Google Login Successful");
            window.location.href = "/dashboard";
          })
          .catch((err) => console.log(`Google Login Error\n\t${err}`));
      };

      function logout(e) {
        signOut(auth)
          .then(() => {
            console.log("Logout Successful");
            window.location.href = "/login";
          })
          .catch((err) => console.log(`Logout Error\n\t${err}`));
      }

      const resetPassword = async () => {
        await sendPasswordResetEmail(auth, email.value)
          .then(() => {
            console.log("Reset Password Successful");
            window.location.href = "/login";
          })
          .catch((err) => console.log(`Reset Password Error\n\t${err}`));
      };

      const addData = async (data) => {
        try {
          const docRef = await addDoc(collection(db, "users"), data);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

      //   const getData = async (collection) => {
      //     return await db.collection(collection).get();
      //   };

      //   const getDataById = async (collection, id) => {
      //     return await db.collection(collection).doc(id).get();
      //   };

      const sendVerificationEmail = async (user) => {
        await sendEmailVerification(user)
          .then(() => console.log("Verification Email Sent"))
          .catch((err) => console.log(`Verification Email Error\n\t${err}`));
      };

      document.getElementById("register").addEventListener("click", register);
      document
        .getElementById("forget")
        .addEventListener("click", resetPassword);