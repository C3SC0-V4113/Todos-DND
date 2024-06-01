import { useCallback, useRef, useState } from "react";
import { useTodoForm } from "./useTodoForm";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "TODO";

export const useTodoDragAndDrop = (index: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { todosState, onReorderedTodos, setTodosState } = useTodoForm();

  const moveTodo = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (isUpdating) return;

      const updatedTodos = [...todosState];
      const [movedTodo] = updatedTodos.splice(dragIndex, 1);
      updatedTodos.splice(hoverIndex, 0, movedTodo);

      const reorderedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        order: index + 1, // Order starts at 1
      }));

      setTodosState(reorderedTodos);
      setIsUpdating(true);

      onReorderedTodos(reorderedTodos);

      setTimeout(() => {
        setIsUpdating(false);
      }, 100);
    },
    [isUpdating, onReorderedTodos, setTodosState, todosState]
  );

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

  return {
    ref,
    isDragging,
    drop,
    drag,
  };
};
