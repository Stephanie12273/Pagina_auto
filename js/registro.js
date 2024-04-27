// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref,child,update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
const database = getDatabase(app);



//button
const submit = document.getElementById('registerButton');
submit.addEventListener("click", function (event) {
  event.preventDefault()
  //inputs
  const nombre = document.getElementById('fullname').value;
  const cedula = document.getElementById('cedula').value;  
  const email = document.getElementById('correo').value;
  const password = document.getElementById('contrasena').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      set(ref(database, 'usuarios/' + user.uid), {
        nombre: nombre,
        cedula: cedula,       
        email: email
      })
      alert("creando usuario ...") 

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
})

//button
const login = document.getElementById('loginButton');
login.addEventListener("click", function (event) {
  event.preventDefault()
  //inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;      
      window.location.href = "Dashboard.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });

})

////
