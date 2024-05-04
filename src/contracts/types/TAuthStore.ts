export type Status = "checking" | "not-authenticated" | "authenticated";

export type AuthState = {
  status: Status;
  uid: null | string;
  email: null | string;
  displayName: null | string;
  photoURL: null | string;
  errorMessage: null | string;
};
