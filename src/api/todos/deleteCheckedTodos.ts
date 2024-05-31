import { FirebaseError } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../apiConfig";

export const deleteCheckedTodos = async (uid: string) => {
  try {
    if (!uid) throw new Error("uid del usuario no existe");

    const todosCollection = collection(FirebaseDB, `${uid}/todo-app/todos/`);
    const q = query(todosCollection, where("checked", "==", true));
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(FirebaseDB);

    querySnapshot.forEach((documentSnapshot) => {
      const docRef = doc(
        FirebaseDB,
        `${uid}/todo-app/todos/${documentSnapshot.id}`
      );
      batch.delete(docRef);
    });

    await batch.commit();

    // Obtener todos los documentos restantes ordenados por "order"
    const remainingTodosQuery = query(todosCollection, orderBy("order", "asc"));
    const remainingTodosSnapshot = await getDocs(remainingTodosQuery);

    // Reordenar los todos restantes
    const updateBatch = writeBatch(FirebaseDB);
    remainingTodosSnapshot.docs.forEach((documentSnapshot, index) => {
      const docRef = doc(
        FirebaseDB,
        `${uid}/todo-app/todos/${documentSnapshot.id}`
      );
      updateBatch.update(docRef, { order: index + 1 });
    });

    await updateBatch.commit();

    return {
      ok: true,
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
