import { useCallback, useState } from "react";
import { useTodoForm } from "./useTodoForm";

export const useTodoDragAndDrop = () => {
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

  return {
    moveTodo,
  };
};