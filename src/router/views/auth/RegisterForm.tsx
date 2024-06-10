import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useRegisterForm } from "./useRegisterForm";

export const RegisterForm = () => {
  const { form, onSubmit, handleSubmit } = useRegisterForm();

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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repeat your Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
          Register
        </Button>
      </div>
      <Link className="self-end" to={"/auth"}>
        <Button variant={"link"} className="text-muted-foreground">
          Sign In
        </Button>
      </Link>
    </div>
  );
};
