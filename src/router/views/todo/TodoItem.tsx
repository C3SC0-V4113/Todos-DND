import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/contracts/types/TTodoStore";

import { useDrag, useDrop } from "react-dnd";

import { FaTimes } from "react-icons/fa";

import { useTodoForm } from "./useTodoForm";

const ItemType = "TODO";

export const TodoItem = ({
  todo,
  index,
  moveTodo,
}: {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onDeleteTodo, onChangeChecked } = useTodoForm();

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveTodo(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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
        onClick={() => onDeleteTodo(todo.id, todo.order)}
      >
        <FaTimes className="text-primary-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};
