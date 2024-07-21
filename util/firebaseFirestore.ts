import { collection, addDoc } from "firebase/firestore";
import { User } from "@/type/user";
import { db } from "./firebase";

export const addEntryToFirestore = async (
  collectionName: string,
  data: User
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
