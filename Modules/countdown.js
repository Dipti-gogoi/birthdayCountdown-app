import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

const dateCountElement = document.getElementById('datecount');

const fetchUserBirthday = async (userId) => {
    try {
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const birthdate = userData.birthdate; 
            return birthdate;
        } else {
            console.error("No user data found.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

const calculateDaysLeft = (birthdate) => {
    const today = new Date();
    const birthdayThisYear = new Date(`${today.getFullYear()}-${birthdate.slice(5)}`);

    if (today > birthdayThisYear) {
        birthdayThisYear.setFullYear(today.getFullYear() + 1);
    }

    const timeDifference = birthdayThisYear - today;
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); 
    return daysLeft;
};


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const birthdate = await fetchUserBirthday(user.uid);     
        if (birthdate) {
            const daysLeft = calculateDaysLeft(birthdate);
            
            if (daysLeft === 365) {
                window.location.href = "birthday.html";
            } else {
                dateCountElement.innerHTML = `${daysLeft}`;
            }
        }
    } else {
        console.log("No user is signed in.");
        window.location.href = "index.html";
    }
});


//Log Out
const logButton = document.getElementById('btnLogout');
logButton.addEventListener("click",function ()   
{
  window.location.href = "index.html";
});