import { Todo } from "@/contracts/types/TTodoStore";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../apiConfig";

export const getTodos = async (uid: string, filter: string) => {
  try {
    if (!uid) throw new Error("uid del usuario no existe");

    console.log(filter);

    const collectionRef = collection(FirebaseDB, `${uid}/todo-app/todos/`);
    let q;

    switch (filter) {
      case "all":
        q = query(collectionRef);
        break;
      case "completed":
        q = query(collectionRef, where("checked", "==", true));
        break;
      case "active":
        q = query(collectionRef, where("checked", "==", false));
        break;
      default:
        q = query(collectionRef);
        break;
    }
    const docs = await getDocs(q);

    const todos = new Array<Todo>();

    docs.forEach((doc) => {
      const data = doc.data() as Todo;
      todos.push({
        ...data,
        id: doc.id,
      });
    });

    const sortedTodos = todos.sort((a, b) => a.order - b.order);

    return {
      ok: true,
      todos: sortedTodos,
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
