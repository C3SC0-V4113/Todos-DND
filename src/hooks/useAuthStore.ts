import { FirebaseAuth } from "@/api/apiConfig";
import API from "@/api/apiServices";
import {
  checkingCredentials,
  clearTodos,
  IRootState,
  login,
  logout,
} from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const checkingAuthentication = async () => {
    return dispatch(checkingCredentials());
  };

  const startGoogleSignIn = async () => {
    dispatch(checkingCredentials());

    const result = await API.auth.signInWithGoogle();
    console.log(result);
    if (!result.ok) {
      return dispatch(logout({ errorMessage: result.errorMessage! }));
    }

    return dispatch(
      login({
        displayName: result.displayName!,
        email: result.email!,
        photoURL: result.photoURL!,
        uid: result.uid!,
      })
    );
  };

  const startLoginWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(checkingCredentials());

    const result = await API.auth.loginWithEmail({ email, password });

    if (!result.ok)
      return dispatch(logout({ errorMessage: result.errorMessage! }));

    return dispatch(
      login({
        displayName: result.displayName!,
        email: result.email!,
        photoURL: result.photoURL!,
        uid: result.uid!,
      })
    );
  };

  const startCreatingUserWithEmail = async ({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await API.auth.registerUserWithEmail({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout({ errorMessage: errorMessage! }));

    dispatch(login({ uid: uid!, displayName, email, photoURL: photoURL! }));
  };

  const startLogout = async () => {
    dispatch(checkingCredentials());
    await API.auth.logoutFirebase();

    dispatch(logout({ errorMessage: "" }));
    dispatch(clearTodos());
  };

  const CheckAuth = () => {
    const { status } = useSelector((state: IRootState) => state.auth);
    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async (user) => {
        if (!user) return dispatch(logout({ errorMessage: "" }));
        const { uid, email, displayName, photoURL } = user;
        dispatch(login({ uid, email, displayName, photoURL }));
      });
    }, [status]);
    return status;
  };

  return {
    CheckAuth,
    checkingAuthentication,
    startCreatingUserWithEmail,
    startGoogleSignIn,
    startLoginWithEmail,
    startLogout,
  };
};
