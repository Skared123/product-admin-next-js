// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqF25zMiuxr1LmFPY7LU21EEwkpkXF0b8",
  authDomain: "product-admin-nextjs-tut-c0f61.firebaseapp.com",
  projectId: "product-admin-nextjs-tut-c0f61",
  storageBucket: "product-admin-nextjs-tut-c0f61.appspot.com",
  messagingSenderId: "41324562489",
  appId: "1:41324562489:web:c92a050208f1e93367a5e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);

/* Auth functions */

/* Sign up with email and password */
export const createUser = async (user: { email: string; password: string }) => {
  return await createUserWithEmailAndPassword(auth, user.email, user.password);
};

/* Sign in with email and password */
export const signIn = async (user: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(auth, user.email, user.password);
};

/* Update users display and photoUrl */
export const updateUser = (user: {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}) => {
  if (auth.currentUser) return updateProfile(auth.currentUser, user);
};

/* Database Functions */

/* Set a document in a collection */
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return setDoc(doc(db, path), data);
};
