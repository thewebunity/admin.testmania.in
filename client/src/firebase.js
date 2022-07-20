import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVe8pZZD-VFRLfl5ZOIwIiglYtM0iWAbs",
  authDomain: "exam-management-66a63.firebaseapp.com",
  projectId: "exam-management-66a63",
  storageBucket: "exam-management-66a63.appspot.com",
  messagingSenderId: "175334140975",
  appId: "1:175334140975:web:974d0a8f013952e50a2ada"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
