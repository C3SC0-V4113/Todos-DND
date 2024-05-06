import API from "@/api/apiServices";
import { checkingCredentials, login, logout } from "@/store";
import { useDispatch } from "react-redux";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const checkingAuthentication = () => {
    return async () => {
      dispatch(checkingCredentials());
    };
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

  return {
    checkingAuthentication,
    startGoogleSignIn,
    startLoginWithEmail,
  };
};
