import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useLoginForm } from "./";

export const LoginForm = () => {
  const { form, onSubmit, handleSubmit } = useLoginForm();

  return (
    <div className="flex flex-col md:self-center md:w-96">
      <Form {...form}>
        <form className="p-2 mt-2 space-y-4 rounded bg-primary text-primary-foreground">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage className="dark:text-popover" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage className="dark:text-popover" />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-col gap-2 my-4">
        <Button
          className="bg-primary text-primary-foreground"
          type="submit"
          onClick={handleSubmit((formData) => onSubmit(formData))}
        >
          Login
        </Button>
        <Button
          variant={"outline"}
          className="text-primary-foreground border-primary-foreground hover:bg-muted hover:text-muted-foreground"
          onClick={() => onSubmit(form.getValues(), "google")}
        >
          Google
        </Button>
      </div>
      <Link className="self-end" to={"register"}>
        <Button variant={"link"} className="text-muted-foreground">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};
