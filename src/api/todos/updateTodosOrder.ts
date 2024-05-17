import { Todo } from "@/contracts/types/TTodoStore";
import { FirebaseError } from "firebase/app";
import { FirebaseDB } from "../apiConfig";
import { doc, writeBatch } from "firebase/firestore/lite";

export const updateTodosOrder = async (uid: string, todos: Todo[]) => {
  try {
    if (!uid) throw new Error("uid del usuario no existe");

    const batch = writeBatch(FirebaseDB);

    todos.forEach((todo) => {
      const todoDoc = doc(FirebaseDB, `${uid}/todo-app/todos/`, todo.id);
      batch.update(todoDoc, { order: todo.order });
    });

    await batch.commit();

    return {
      ok: true,
      todos: [] as Todo[],
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
        todos: [] as Todo[],
        errorCode,
        errorMessage,
      };
    } else {
      return {
        ok: false,
        todos: [] as Todo[],
        errorCode: "520",
        errorMessage: "Unkown error",
      };
    }
  }
};
