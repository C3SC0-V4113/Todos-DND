import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth, handleFirebaseError } from "../apiConfig";
import { FirebaseError } from "firebase/app";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(
      FirebaseAuth,
      new GoogleAuthProvider()
    );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = handleFirebaseError(error);

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
