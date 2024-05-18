import { FirebaseError } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../apiConfig";
import { Todo } from "@/contracts/types/TTodoStore";

export const deleteTodo = async (
  uid: string,
  todoId: string,
  orderTodo: number
) => {
  try {
    if (!uid) throw new Error("uid del usuario no existe");

    /** Delete Todo */
    const todoDocRef = doc(FirebaseDB, `${uid}/todo-app/todos/${todoId}`);

    await deleteDoc(todoDocRef);

    /** Reorder Todos */
    const todosCollection = collection(FirebaseDB, `${uid}/todo-app/todos/`);
    const q = query(todosCollection, orderBy("order"));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(FirebaseDB);

    querySnapshot.docs.forEach((docSnap) => {
      const todo = docSnap.data() as Todo;
      if (todo.order > orderTodo) {
        const todoRef = docSnap.ref;
        batch.update(todoRef, { order: todo.order - 1 });
      }
    });

    await batch.commit();

    return {
      ok: true,
      todoId,
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
