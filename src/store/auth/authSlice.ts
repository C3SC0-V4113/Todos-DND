import { AuthState } from "@/contracts/types/TAuthStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  startCreatingUserWithEmail,
  startGoogleSignIn,
  startLoginWithEmail,
  startLogout,
} from "./authThunks";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // "checking", "not-authenticated", "authenticated"
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  } as AuthState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        uid: null | string;
        email: null | string;
        displayName: null | string;
        photoURL: null | string;
      }>
    ) => {
      state.status = "authenticated";
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, action: PayloadAction<{ errorMessage: string | null }>) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = action.payload?.errorMessage
        ? action.payload.errorMessage
        : null;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGoogleSignIn.pending, (state) => {
        state.status = "checking";
      })
      .addCase(startGoogleSignIn.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
        state.errorMessage = null;
      })
      .addCase(startGoogleSignIn.rejected, (state, action) => {
        state.status = "not-authenticated";
        state.errorMessage = action.payload as string;
      })
      .addCase(startLoginWithEmail.pending, (state) => {
        state.status = "checking";
      })
      .addCase(startLoginWithEmail.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
        state.errorMessage = null;
      })
      .addCase(startLoginWithEmail.rejected, (state, action) => {
        state.status = "not-authenticated";
        state.errorMessage = action.payload as string;
      })
      .addCase(startCreatingUserWithEmail.pending, (state) => {
        state.status = "checking";
      })
      .addCase(startCreatingUserWithEmail.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
        state.errorMessage = null;
      })
      .addCase(startCreatingUserWithEmail.rejected, (state, action) => {
        state.status = "not-authenticated";
        state.errorMessage = action.payload as string;
      })
      .addCase(startLogout.pending, (state) => {
        state.status = "checking";
      })
      .addCase(startLogout.fulfilled, (state) => {
        state.status = "not-authenticated";
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = null;
      });
  },
});
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
