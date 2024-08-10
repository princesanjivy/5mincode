import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile,
} from "firebase/auth";

export const signUpWithEmailPassword = async (
  email: string,
  displayName: string,
  password: string
): Promise<User | null> => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCred.user, { displayName });
    return userCred.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    console.log("sigin in ");
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// export const signOut = async () => {
//   try {
//     await auth.signOut();
//   } catch (error) {
//     throw error;
//   }
// };
