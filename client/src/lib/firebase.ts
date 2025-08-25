// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqPG9kVnYx6DPa6SajD2wSEl7y7UU9Gfc",
  authDomain: "tastelocale-d8722.firebaseapp.com",
  projectId: "tastelocale-d8722",
  storageBucket: "tastelocale-d8722.firebasestorage.app",
  messagingSenderId: "379256144291",
  appId: "1:379256144291:web:75ff9c85ea36b455555a16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;