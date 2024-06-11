import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth, handleFirebaseError } from "../apiConfig";
import { FirebaseError } from "firebase/app";

interface Props {
  email: string;
  password: string;
  displayName: string;
}

export const registerUserWithEmail = async ({
  email,
  password,
  displayName,
}: Props) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
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
