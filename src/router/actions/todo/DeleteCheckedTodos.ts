import { startDeletingCheckedTodos } from "@/store/todo/todoThunks";
import { store } from "../../../store/store";

export const DeleteCheckedTodos = () => async () => {
  return store.dispatch(startDeletingCheckedTodos());
};
