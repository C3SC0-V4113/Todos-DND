export type Status = "checking" | "not-authenticated" | "authenticated";

export type AuthState = {
  status: Status;
  uid: null | string;
  email: null | string;
  displayName: null | string;
  photoURL: null | string;
  errorMessage: null | string;
};

export type LoginActionProps = {
  startGoogleSignIn: () => Promise<
    | {
        payload: {
          errorMessage: string | null;
        };
        type: "auth/logout";
      }
    | {
        payload: {
          uid: string | null;
          email: string | null;
          displayName: string | null;
          photoURL: string | null;
        };
        type: "auth/login";
      }
  >;
  startLoginWithEmail: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<
    | {
        payload: {
          errorMessage: string | null;
        };
        type: "auth/logout";
      }
    | {
        payload: {
          uid: string | null;
          email: string | null;
          displayName: string | null;
          photoURL: string | null;
        };
        type: "auth/login";
      }
  >;
};
