import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFetcher } from "react-router-dom";

export const useTodoForm = () => {
  const fetcher = useFetcher();
  const formSchema = z.object({
    todo: z.string().min(4, "Todo must be at least 4 characters long"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    fetcher.submit(values, {
      method: "POST",
    });

    form.reset();
  };

  return {
    form,
    onSubmit,
  };
};
