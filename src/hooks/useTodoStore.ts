import API from "@/api/apiServices";
import { Todo } from "@/contracts/types/TTodoStore";
import {
  addNewTodo,
  IRootState,
  savingTodo,
  setTodos,
  updateOrderTodos,
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

  return {
    startSavingTodo,
    startNewTodo,
    startLoadingTodos,
    startReorderTodos,
  };
};
