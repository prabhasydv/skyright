import { auth } from "./Firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const loginWithFacebook = () =>
  signInWithPopup(auth, facebookProvider);

export const logout = () => signOut(auth);
