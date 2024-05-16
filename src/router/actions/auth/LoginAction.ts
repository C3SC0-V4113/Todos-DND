import { LoginActionProps } from "@/contracts/types/TAuthStore";
import { ActionFunctionArgs } from "react-router-dom";

export const LoginAction =
  ({ startGoogleSignIn, startLoginWithEmail }: LoginActionProps) =>
  async (actionArg: ActionFunctionArgs) => {
    const formData = await actionArg.request.formData();
    const formId = formData.get("formId");
    switch (formId) {
      case "normal":
        startLoginWithEmail({
          email: formData.get("email")?.toString() || "",
          password: formData.get("password")?.toString() || "",
        });
        break;
      case "google":
        startGoogleSignIn();
        break;
      default:
        break;
    }
    return null;
  };
