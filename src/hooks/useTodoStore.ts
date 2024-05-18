import API from "@/api/apiServices";
import { Todo } from "@/contracts/types/TTodoStore";
import {
  addNewTodo,
  deleteTodo,
  IRootState,
  savingTodo,
  setTodos,
  stopSavingTodo,
  updateOrderTodos,
  updateTodoChecked,
} from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useTodoStore = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: IRootState) => state.auth);

  const startSavingTodo = async () => {
    return dispatch(savingTodo());
  };

  const startNewTodo = async (name: string) => {
    dispatch(savingTodo());
    const todo = await API.todos.createTodo(uid!, name);
    console.log(todo);
    return dispatch(addNewTodo(todo.newTodo!));
  };

  const startLoadingTodos = async () => {
    dispatch(savingTodo());
    const todos = await API.todos.getTodos(uid!);
    dispatch(setTodos(todos.todos!));
    return todos.todos;
  };

  const startReorderTodos = async (todos: Todo[]) => {
    dispatch(savingTodo());
    await API.todos.updateTodosOrder(uid!, todos);
    return dispatch(updateOrderTodos(todos));
  };

  const startDeletingTodo = async (todoId: string, todoOrder: number) => {
    dispatch(savingTodo());
    const response = await API.todos.deleteTodo(uid!, todoId, todoOrder);
    if (response.ok) {
      return dispatch(deleteTodo(response.todoId!));
    }
    return dispatch(stopSavingTodo());
  };

  const startCheckingTodo = async (todoId: string, checked: boolean) => {
    dispatch(savingTodo());
    const response = await API.todos.toggleCheckedTodo(uid!, todoId, checked);
    if (response.ok) {
      return dispatch(updateTodoChecked({ todoId, checked }));
    }
    return dispatch(stopSavingTodo());
  };

  return {
    startSavingTodo,
    startNewTodo,
    startLoadingTodos,
    startReorderTodos,
    startDeletingTodo,
    startCheckingTodo,
  };
};
