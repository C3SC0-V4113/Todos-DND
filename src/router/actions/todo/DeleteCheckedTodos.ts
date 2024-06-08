import { startDeletingCheckedTodos } from "@/store/todo/todoThunks";
import { store } from "../../../store/store";

export const DeleteCheckedTodos = () => async () => {
  const { uid } = store.getState().auth;
  return store.dispatch(startDeletingCheckedTodos(uid!));
};
