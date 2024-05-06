import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ActionFunctionArgs, useSubmit } from "react-router-dom";
import { LoginActionProps } from "@/contracts/types/TAuthStore";

export const useLoginForm = () => {
  const submit = useSubmit();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formId = "normal";
    submit(
      { ...values, formId },
      {
        method: "POST",
      }
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    form,
    onSubmit,
  };
};

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
