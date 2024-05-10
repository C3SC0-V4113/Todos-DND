import { Todo } from "@/contracts/types/TTodoStore";
import { FirebaseError } from "firebase/app";

export const getNotes = (uid: string) => {
  try {
    if (!uid) throw new Error("uid del usuario no existe");

    const todos = [] as Todo[];
    return {
      todos,
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
