import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"; 
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1qt1t1mmlUfd1Bk9E4BFaJRQ-HK0SPac",
  authDomain: "fir-auth-demo-1ee5f.firebaseapp.com",
  databaseURL: "https://fir-auth-demo-1ee5f-default-rtdb.firebaseio.com",
  projectId: "fir-auth-demo-1ee5f",
  storageBucket: "fir-auth-demo-1ee5f.firebasestorage.app",
  messagingSenderId: "778265394790",
  appId: "1:778265394790:web:cf37444e880dd82d0637a7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const signUpButton = document.getElementById("sign-up");
const returnButton = document.getElementById("return-btn");
const mainSection = document.getElementById("main");
const createAcctSection = document.getElementById("create-acct");

//sign up
const createAcctButton = document.getElementById("create-acct-btn");
createAcctButton?.addEventListener("click", async (event) => {
  event.preventDefault(); 

  const username = document.getElementById("username-signup").value; 
  const email = document.getElementById("email-signup").value; 
  const password = document.getElementById("password-signup").value;
  const birthdate = document.getElementById("date-signup").value;

  if (username && email && password && birthdate) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, { 
        username: username,
        birthdate: birthdate,
      });

      alert("Account created successfully!");
      window.location.href = "index.html";
      alert("Please sign in using your email and password");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already associated with an account. Please use a different email.");
      } else {
        alert("Sign-up failed: " + error.message);
      }
    }
  } else {
    alert("Please fill in all fields.");
  }
});


signUpButton.addEventListener("click", () => {
  mainSection.style.display = "none";
  createAcctSection.style.display = "block";
});


returnButton.addEventListener("click", () => {
  console.log("Return button clicked"); 
  mainSection.style.display = "block"; 
  createAcctSection.style.display = "none"; 
});

//Sign In
const signInButton = document.getElementById("submit");
signInButton.addEventListener("click", (event) => {
  event.preventDefault(); 

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    const userRef = ref(database, `users/${user.uid}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userName = userData.username;

        console.log("UserData:", userData); 

        if (userName) { 
          const userBirthdate = userData.birthdate; 
          const birthdate = new Date(userBirthdate);
        const today = new Date();
        const todayMonth = today.getUTCMonth();
        const todayDate = today.getUTCDate();
        
        const birthMonth = birthdate.getUTCMonth();
        const birthDate = birthdate.getUTCDate();
        if (todayMonth === birthMonth && todayDate === birthDate) {
          window.location.href = `birthday.html?userName=${encodeURIComponent(userName)}`;
        } else {
          window.location.href = "countdown.html";
        }
      } else {
        alert("No user data found.");
      }
    }}).catch((error) => {
      console.error(error);
    });
  })
});

// Log Out
const logoutButton = document.getElementById("btnLogout");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  });
}
