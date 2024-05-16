import { Status } from "@/contracts/types/TAuthStore";
import { redirect } from "react-router-dom";

export const CheckingLoader =
  ({ status }: { status: Status }) =>
  () => {
    if (status === "authenticated") {
      return redirect("/");
    }
    if (status === "not-authenticated") {
      return redirect("/auth");
    }
    return null;
  };
