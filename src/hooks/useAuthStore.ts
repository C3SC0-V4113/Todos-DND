import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "@/api/apiConfig";
import { IRootState, login, logout, store } from "@/store";
import { startLogout as logoutThunk } from "@/store/auth/authThunks";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const startLogout = async () => {
    store.dispatch(logoutThunk());
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
    startLogout,
  };
};
