import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/contracts/types/TTodoStore";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useFetcher } from "react-router-dom";

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
  const fetcher = useFetcher();

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const onClick = () => {
    fetcher.submit(
      { todoId: todo.id, todoOrder: todo.order },
      { method: "post", action: "/delete" }
    );
  };

  return (
    <div
      ref={ref}
      className={`flex justify-between w-full px-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex gap-2">
        <Checkbox id={todo.id} className="my-auto" />
        <label className="my-auto" htmlFor={todo.id}>
          {todo.name}
        </label>
      </div>
      <Button variant={"link"} onClick={onClick}>
        <FaTimes className="text-primary-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};
