import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmit } from "react-router-dom";

export const useLoginForm = () => {
  const submit = useSubmit();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  });

  const onSubmit = (values: z.infer<typeof formSchema>, formId = "normal") => {
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

  const { handleSubmit } = form;

  return {
    form,
    handleSubmit,
    onSubmit,
  };
};
