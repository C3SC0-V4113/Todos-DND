import API from "@/api/apiServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearTodos } from "../todo";

export const startGoogleSignIn = createAsyncThunk(
  "auth/startGoogleSignIn",
  async (_, { rejectWithValue }) => {
    const result = await API.auth.signInWithGoogle();
    if (!result.ok) {
      return rejectWithValue(result.errorMessage);
    }
    return {
      displayName: result.displayName!,
      email: result.email!,
      photoURL: result.photoURL!,
      uid: result.uid!,
    };
  }
);

export const startLoginWithEmail = createAsyncThunk(
  "auth/startLoginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const result = await API.auth.loginWithEmail({ email, password });
    if (!result.ok) {
      return rejectWithValue(result.errorMessage);
    }
    return {
      displayName: result.displayName!,
      email: result.email!,
      photoURL: result.photoURL!,
      uid: result.uid!,
    };
  }
);

export const startCreatingUserWithEmail = createAsyncThunk(
  "auth/startCreatingUserWithEmail",
  async (
    {
      email,
      password,
      displayName,
    }: { email: string; password: string; displayName: string },
    { rejectWithValue }
  ) => {
    const { ok, uid, photoURL, errorMessage } =
      await API.auth.registerUserWithEmail({ email, password, displayName });
    if (!ok) {
      return rejectWithValue(errorMessage);
    }
    return { uid: uid!, displayName, email, photoURL: photoURL! };
  }
);

export const startLogout = createAsyncThunk(
  "auth/startLogout",
  async (_, { dispatch }) => {
    await API.auth.logoutFirebase();
    dispatch(clearTodos());
    return {};
  }
);
