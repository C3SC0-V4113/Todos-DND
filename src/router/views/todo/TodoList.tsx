import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { TodoItem } from "./TodoItem";
import { TodoFilterForm } from "./TodoFilterForm";
import { useTodoForm } from "./useTodoForm";

export const TodoList = () => {
  const {
    todosState,
    checkedTodos,
    isSaving,
    filter,
    notCheckedTodos,
    onClearComplete,
  } = useTodoForm();

  return (
    <>
      <div className="flex flex-col mt-4 rounded-t bg-primary text-primary-foreground h-80">
        <ScrollArea className="h-full">
          {todosState.map((todo, index) => (
            <TodoItem key={todo.id} index={index} todo={todo} />
          ))}
        </ScrollArea>
      </div>
      <div className="flex justify-between py-2 align-middle border-t rounded-b border-t-muted-foreground bg-primary text-primary-foreground">
        <p className="px-4 my-auto text-sm font-medium text-muted-foreground">{`${checkedTodos} items left`}</p>
        <TodoFilterForm className="hidden md:mt-0 w-52 md:flex" />
        <Button
          variant={"link"}
          className="text-muted-foreground"
          disabled={isSaving || filter === "active" || notCheckedTodos === 0}
          onClick={onClearComplete}
        >
          Clear Completed
        </Button>
      </div>
    </>
  );
};
