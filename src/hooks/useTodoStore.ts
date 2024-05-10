import API from "@/api/apiServices";
import { addNewTodo, IRootState, savingTodo, setTodos } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useTodoStore = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: IRootState) => state.auth);

  const startSavingTodo = async () => {
    return dispatch(savingTodo());
  };

  const startNewTodo = async (name: string) => {
    dispatch(savingTodo());
    console.log(uid);
    const todo = {
      id: "1",
      name,
      order: 1,
      checked: false,
    };
    return dispatch(addNewTodo(todo));
  };

  const startLoadingTodos = async () => {
    dispatch(savingTodo());
    const todos = await API.todos.getNotes(uid!);
    dispatch(setTodos(todos.todos!));
  };

  return {
    startSavingTodo,
    startNewTodo,
    startLoadingTodos,
  };
};
