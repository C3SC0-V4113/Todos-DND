import { AuthLoaderProps, Status } from "@/contracts/types/TAuthStore";
import { redirect } from "react-router-dom";

export const AuthLoader =
  ({ checkingAuthentication, CheckAuth }: AuthLoaderProps) =>
  async () => {
    checkingAuthentication();

    switch (CheckAuth() as Status) {
      case "authenticated":
        console.log("Authenticated");
        return redirect("/");
      case "not-authenticated":
        console.log("Not Authenticated");
        return redirect("/auth");
      default:
        console.log("Checking");
        return redirect("/auth/checking");
    }
  };
