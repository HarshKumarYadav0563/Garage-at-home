// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmbv9jdmGyokCM6FTHXqEJHwiuJgV5-Ng",
  authDomain: "d2bcart-4abbd.firebaseapp.com",
  projectId: "d2bcart-4abbd",
  storageBucket: "d2bcart-4abbd.firebasestorage.app",
  messagingSenderId: "622626685320",
  appId: "1:622626685320:web:8a737ff54eadcdbc34fa3d",
  measurementId: "G-H2CJRGGCS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
export default app;