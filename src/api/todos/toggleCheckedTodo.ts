import { Todo } from "@/contracts/types/TTodoStore";
import { FirebaseError } from "firebase/app";
import { doc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../apiConfig";

export const toggleCheckedTodo = async (
  uid: string,
  todoId: string,
  checked: boolean
) => {
  try {
    if (!uid) throw new Error("uid del usuario no existe");

    const todoDocRef = doc(FirebaseDB, `${uid}/todo-app/todos/${todoId}`);

    console.log(checked);
    await updateDoc(todoDocRef, { checked });

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
