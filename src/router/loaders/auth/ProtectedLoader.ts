import { Status } from "@/contracts/types/TAuthStore";
import { redirect } from "react-router-dom";

export const ProtectedLoader =
  ({ status }: { status: Status }) =>
  () => {
    if (status === "not-authenticated") {
      return redirect("/auth");
    }
    if (status === "checking") {
      return redirect("/checking");
    }
    return null;
  };
