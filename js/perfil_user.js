// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue   } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeawQZj21YKtQGdataynvtYObmw0PqYM0",
    authDomain: "auto-3e78d.firebaseapp.com",
    databaseURL: "https://auto-3e78d-default-rtdb.firebaseio.com",
    projectId: "auto-3e78d",
    storageBucket: "auto-3e78d.appspot.com",
    messagingSenderId: "708377410131",
    appId: "1:708377410131:web:b274e64bf304e3db8764a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)



const logout = document.getElementById("fin_sesion");
logout.addEventListener('click', function logout() {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "index.html"
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
});




