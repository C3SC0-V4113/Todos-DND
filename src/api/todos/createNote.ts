import { FirebaseError } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../apiConfig";

export const createNote = async (uid: string, name: string) => {
  try {
    if (!uid) throw new Error("uid del usuario no existe");

    const todosCollection = collection(FirebaseDB, `${uid}/todo-app/todos/`);

    const q = query(todosCollection, orderBy("order", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    let maxOrder = 0;
    if (!querySnapshot.empty) {
      const lastDoc = querySnapshot.docs[0];
      maxOrder = lastDoc.data().order;
    }

    const newOrder = maxOrder + 1;

    const newDoc = doc(todosCollection);

    const newTodo = {
      id: "",
      order: newOrder,
      name,
      checked: false,
    };

    await setDoc(newDoc, newTodo);

    newTodo.id = newDoc.id;

    return {
      ok: true,
      newTodo,
      errorCode: null,
      errorMessage: null,
    };
  } catch (error) {
    // Handle Errors here.
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        ok: false,
        errorCode,
        errorMessage,
      };
    } else {
      return {
        ok: false,
        errorCode: "520",
        errorMessage: "Unkown error",
      };
    }
  }
};
