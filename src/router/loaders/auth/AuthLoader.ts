import { Status } from "@/contracts/types/TAuthStore";
import { redirect } from "react-router-dom";

export const AuthLoader =
  ({ status }: { status: Status }) =>
  () => {
    if (status === "authenticated") {
      return redirect("/");
    }
    if (status === "checking") {
      return redirect("/checking");
    }
    return null;
  };
