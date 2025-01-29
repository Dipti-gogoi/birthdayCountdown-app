import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyA1qt1t1mmlUfd1Bk9E4BFaJRQ-HK0SPac",
    authDomain: "fir-auth-demo-1ee5f.firebaseapp.com",
    databaseURL: "https://fir-auth-demo-1ee5f-default-rtdb.firebaseio.com",
    projectId: "fir-auth-demo-1ee5f",
    storageBucket: "fir-auth-demo-1ee5f.firebasestorage.app",
    messagingSenderId: "778265394790",
    appId: "1:778265394790:web:cf37444e880dd82d0637a7"
  };
 
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = decodeURIComponent(urlParams.get('userName'));

  const birthdayMessage = document.getElementById('birthdayMessage');
  if(birthdayMessage){
  birthdayMessage.textContent = `Happy Birthday, ${userName}!`;
  }
  fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => {
      const advice = data.slip.advice;
      document.getElementById('advice').textContent = `${advice}`
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

const logoutButton = document.getElementById('btnLogout');
logoutButton?.addEventListener("click",function ()   
{
  window.location.href = "index.html";
});


// CONFETTI/FIREWORK EFFECT
var duration = 30 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function() {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 50 * (timeLeft / duration);
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
}, 250);


