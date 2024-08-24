// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVSNNoglayONsH-AvxdP7Ziv10b4Y4zFY",
  authDomain: "login-form-26f90.firebaseapp.com",
  projectId: "login-form-26f90",
  storageBucket: "login-form-26f90.appspot.com",
  messagingSenderId: "899671234603",
  appId: "1:899671234603:web:b4cd95b9c12f60e4a2726e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1; // Corrected line
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const SignUp=document.getElementById('submitSignUp');
SignUp.addEventListener('click',(event)=>{
  event.preventDefault();
  const email=document.getElementById('rEmail').value;
  const password=document.getElementById('rPassword').value;
  const firstName=document.getElementById('fName').value;
  const lastName=document.getElementById('lName').value;

  const auth=getAuth();
  const db=getFirestore();

  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
    const user=userCredential.user;
    const userData={
      email:email,
      firstname:firstName,
      lastname:lastName
    };
    showMessage("User Created Successfully","signUpMessage");
    const docRef=doc(db,'users',user.uid);
    setDoc(docRef,userData)
    .then(()=>{
      window.location.href="index.html";
    })
    .catch((error)=>{
      console.error("Error writing document: ", error);
    });
  })
  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode=="auth/email-already-in-use"){
      showMessage("The email address is already in use by another account", "signUpMessage");
    }
    else{
      showMessage('unable to create User', "signUpMessage");
    }
  });
})

const SignIn=document.getElementById('submitSignIn');
SignIn.addEventListener('click',(event)=>{
  event.preventDefault();
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;

  const auth=getAuth();
  signInWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
    const user=userCredential.user;
    showMessage("User Logged In Successfully","signInMessage");
    localStorage.setItem("loggedInUserId",user.uid,);
    window.location.href="homepage.html";
  })
  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode=="auth/invalid-credential"){
      showMessage("There is no user record corresponding to this identifier. The user may have been deleted.", "signInMessage");
    }
    else{
      showMessage('unable to Sign In', "signInMessage");
    }
  });
})