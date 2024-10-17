import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU6xv5p48udUboXTe6lPdKJfg1Dq4E2lg",
  authDomain: "gharsetu-43a5b.firebaseapp.com",
  projectId: "gharsetu-43a5b",
  storageBucket: "gharsetu-43a5b.appspot.com",
  messagingSenderId: "987398183920",
  appId: "1:987398183920:web:061a9935c447c30e195b35",
  measurementId: "G-9Q3DYYXW9F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };