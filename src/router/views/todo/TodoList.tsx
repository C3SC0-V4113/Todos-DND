import { Todo } from "@/contracts/types/TTodoStore";
import { useFetcher, useLoaderData } from "react-router-dom";
import { TodoItem } from "./TodoItem";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TodoFilterForm } from "./TodoFilterForm";

export const TodoList = () => {
  const todos = useLoaderData() as Todo[];
  const fetcher = useFetcher();
  const [todosState, setTodosState] = useState<Todo[]>(todos);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setTodosState(todos);
  }, [todos]);

  const moveTodo = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (isUpdating) return;

      const updatedTodos = [...todos];
      const [movedTodo] = updatedTodos.splice(dragIndex, 1);
      updatedTodos.splice(hoverIndex, 0, movedTodo);

      const reorderedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        order: index + 1, // Order starts at 1
      }));

      setTodosState(reorderedTodos);
      setIsUpdating(true);

      fetcher.submit(
        { todos: JSON.stringify(reorderedTodos) },
        { method: "post", action: "/order" }
      );

      setTimeout(() => {
        setIsUpdating(false);
      }, 100);
    },
    [todos, fetcher, isUpdating]
  );

  return (
    <>
      <div className="flex flex-col mt-4 rounded-t bg-primary text-primary-foreground h-80">
        <ScrollArea className="h-full">
          {todosState.map((todo, index) => (
            <TodoItem
              key={todo.id}
              index={index}
              todo={todo}
              moveTodo={moveTodo}
            />
          ))}
        </ScrollArea>
      </div>
      <div className="flex justify-between py-2 align-middle border-t rounded-b border-t-primary-foreground bg-primary text-primary-foreground">
        <p className="px-4 my-auto">{`${
          todosState.filter((todo) => todo.checked === false).length
        } items left`}</p>
        <TodoFilterForm className="hidden mt-0 w-52 md:flex" />
        <fetcher.Form method="POST" action="/delete-checked">
          <Button variant={"link"} className="text-primary-foreground">
            Clear Completed
          </Button>
        </fetcher.Form>
      </div>
    </>
  );
};
