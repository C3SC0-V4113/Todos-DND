import { FaTimes } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/contracts/types/TTodoStore";

import { useTodoForm } from "./useTodoForm";
import { useTodoDragAndDrop } from "./useTodoDragAndDrop";

export const TodoItem = ({ todo, index }: { todo: Todo; index: number }) => {
  const { drag, drop, isDragging, ref } = useTodoDragAndDrop(index);
  const { onDeleteTodo, onChangeChecked, isSaving } = useTodoForm();

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex border-b last:border-b-0 border-b-primary-foreground justify-between w-full px-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-center gap-2 my-auto align-middle">
        <Checkbox
          className="my-auto"
          checked={todo.checked}
          onClick={() => onChangeChecked(todo.checked, todo.id)}
        />
        <label
          className={`my-auto ${todo.checked && "line-through opacity-50"}`}
        >
          {todo.name}
        </label>
      </div>
      <Button
        variant={"link"}
        disabled={isSaving}
        onClick={() => onDeleteTodo(todo.id, todo.order)}
      >
        <FaTimes className="text-primary-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};
