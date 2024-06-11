import { useSelector } from "react-redux";
import { useTodoForm } from "./useTodoForm";
import { DropResult } from "@hello-pangea/dnd";
import { IRootState } from "@/store";

export const useTodoDragAndDrop = () => {
  const { onReorderedTodos, setTodosState } = useTodoForm();
  const { todos } = useSelector((state: IRootState) => state.todo);
  //   (dragIndex: number, hoverIndex: number) => {
  //     if (isUpdating) return;

  //     const updatedTodos = [...todosState];
  //     const [movedTodo] = updatedTodos.splice(dragIndex, 1);
  //     updatedTodos.splice(hoverIndex, 0, movedTodo);

  //     const reorderedTodos = updatedTodos.map((todo, index) => ({
  //       ...todo,
  //       order: index + 1, // Order starts at 1
  //     }));

  //     setTodosState(reorderedTodos);
  //     setIsUpdating(true);

  //     onReorderedTodos(reorderedTodos);

  //     setTimeout(() => {
  //       setIsUpdating(false);
  //     }, 100);
  //   },
  //   [isUpdating, onReorderedTodos, setTodosState, todosState]
  // );

  // const [, drop] = useDrop({
  //   accept: ItemType,
  //   hover(item: { index: number }) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;

  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     moveTodo(dragIndex, hoverIndex);

  //     item.index = hoverIndex;
  //   },
  // });

  // const [{ isDragging }, drag] = useDrag({
  //   type: ItemType,
  //   item: { index },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  const onDragEnd = (result: DropResult) => {
    // Manejar el evento de finalización del arrastre aquí, si es necesario
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedTodos = [...todos];
    const [movedTodos] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, movedTodos);

    const reorderedTodos = updatedTodos.map((todo, index) => ({
      ...todo,
      order: index + 1,
    }));

    setTodosState(reorderedTodos);
    onReorderedTodos(reorderedTodos);
  };

  return {
    onDragEnd,
  };
};
