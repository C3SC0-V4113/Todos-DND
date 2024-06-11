import { store } from "@/store";
import {
  startGoogleSignIn,
  startLoginWithEmail,
} from "@/store/auth/authThunks";
import { ActionFunctionArgs } from "react-router-dom";

export const LoginAction = () => async (actionArg: ActionFunctionArgs) => {
  const formData = await actionArg.request.formData();
  const formId = formData.get("formId");
  switch (formId) {
    case "normal":
      store.dispatch(
        startLoginWithEmail({
          email: formData.get("email")?.toString() || "",
          password: formData.get("password")?.toString() || "",
        })
      );
      break;
    case "google":
      store.dispatch(startGoogleSignIn());
      break;
    default:
      break;
  }
  return null;
};
