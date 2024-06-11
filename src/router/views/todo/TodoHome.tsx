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
import { TodoFilterForm, TodoList } from "./components";

export const TodoHome = () => {
  const { formInput, isSaving, onSubmitInput } = useTodoForm();

  return (
    <div>
      <Form {...formInput}>
        <form className="mt-4" onSubmit={formInput.handleSubmit(onSubmitInput)}>
          <FormField
            control={formInput.control}
            name="todo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-primary text-primary-foreground placeholder:text-muted-foreground"
                    placeholder="Create a new todo..."
                    disabled={isSaving}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-accent dark:text-popover" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSaving} className="hidden" />
        </form>
      </Form>
      <TodoList />
      <TodoFilterForm className="md:hidden" />
      <p className="py-4 text-center text-muted-foreground">
        Drag and drop to reorder list
      </p>
    </div>
  );
};
