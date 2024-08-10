import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";
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

export const getDocumentsByFieldFromFirestore = async (
  collectionName: string,
  field: string,
  operator: WhereFilterOp,
  value: any
): Promise<any[]> => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(field, operator, value));
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map the documents to an array of data objects
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Filtered documents data:", documents);
    return documents;
  } catch (e) {
    console.error("Error getting filtered documents: ", e);
    return [];
  }
};
