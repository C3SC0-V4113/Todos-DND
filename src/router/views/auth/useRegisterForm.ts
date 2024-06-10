import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmit } from "react-router-dom";

export const useRegisterForm = () => {
  const submit = useSubmit();
  const formSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6).max(50),
      confirmPassword: z.string().min(6).max(50),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submit(
      { ...values },
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
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  return {
    form,
    handleSubmit,
    onSubmit,
  };
};
