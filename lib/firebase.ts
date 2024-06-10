// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  uploadString,
  getDownloadURL,
  ref,
} from "firebase/storage";
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
export const storage = getStorage(app);

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

export const sendResetEmail = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

//Sign Out
export const signOutAccount = () => {
  localStorage.removeItem("user");
  return auth.signOut();
};

/* ================Database Functions=================== */

export const getCollection = async (
  collectionName: string,
  queryArray?: any[]
) => {
  const ref = collection(db, collectionName);
  const q = queryArray ? query(ref, ...queryArray) : query(ref);

  return (await getDocs(q)).docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/* Get a document from a collection */
export const getDocument = async (path: string) => {
  return (await getDoc(doc(db, path))).data();
};

/* Add a document in a collection */
export const addDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return addDoc(collection(db, path), data);
};

/* Set a document in a collection */
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return setDoc(doc(db, path), data);
};

/* Update a document in a collection */
export const updateDocument = (path: string, data: any) => {
  return updateDoc(doc(db, path), data);
};

/* Delete a document from a collection */
export const deleteDocument = (path: string) => {
  return deleteDoc(doc(db, path));
};

/* ================== STORAGE FUNCTIONS ================== */

/* Upload a file with base64 format and get the url*/
export const uploadBase64 = async (path: string, base64: string) => {
  await uploadString(ref(storage, path), base64, "data_url");
  return await getDownloadURL(ref(storage, path));
};
