// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3EInW2xZK-iX4HIltPQABVO1Sy_Twh3E",
  authDomain: "registerogiin.firebaseapp.com",
  projectId: "registerogiin",
  storageBucket: "registerogiin.firebasestorage.app",
  messagingSenderId: "303547129828",
  appId: "1:303547129828:web:18da6842b20216027cf1f1",
  measurementId: "G-NFXNR8FWF3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
