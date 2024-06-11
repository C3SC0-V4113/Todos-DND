import { store } from "@/store";
import { startCreatingUserWithEmail } from "@/store/auth/authThunks";
import { ActionFunctionArgs } from "react-router-dom";

export const RegisterAction = () => async (actionArg: ActionFunctionArgs) => {
  const formData = await actionArg.request.formData();
  store.dispatch(
    startCreatingUserWithEmail({
      displayName: formData.get("displayName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    })
  );
  return null;
};
