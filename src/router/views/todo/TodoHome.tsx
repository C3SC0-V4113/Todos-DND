import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTodoForm } from "./useTodoForm";
import { TodoList } from "./TodoList";
import { TodoFilterForm } from "./TodoFilterForm";

export const TodoHome = () => {
  const { form, onSubmit } = useTodoForm();
  return (
    <div>
      <Form {...form}>
        <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Create a new todo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="hidden" />
        </form>
      </Form>
      <TodoList />
      <TodoFilterForm className="md:hidden" />
      <p className="py-4 text-center">Drag and drop to reorder list</p>
    </div>
  );
};
