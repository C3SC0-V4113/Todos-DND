import { Todo } from "@/contracts/types/TTodoStore";
import { useLoaderData } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const TodoList = () => {
  const todos = useLoaderData() as Todo[];
  return (
    <div className="flex flex-col mt-4 rounded bg-primary text-primary-foreground">
      {todos.map((todo) => (
        <div className="flex justify-between w-full px-2" key={todo.id}>
          <div className="flex gap-2">
            <Checkbox id={todo.id} className="my-auto" />
            <label className="my-auto" htmlFor={todo.id}>
              {todo.name}
            </label>
          </div>
          <Button variant={"link"}>
            <FaTimes className="text-primary-foreground hover:text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
};
