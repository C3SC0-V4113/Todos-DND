import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmit } from "react-router-dom";

export const useTodoForm = () => {
  const submit = useSubmit();
  const formSchema = z.object({
    todo: z.string().min(4, "Todo must be at least 4 characters long"),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submit(values, {
      method: "POST",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  return {
    form,
    onSubmit,
  };
};
