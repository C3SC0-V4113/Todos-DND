import { startDeletingCheckedTodos, store } from "@/store";

export const DeleteCheckedTodos = () => async () => {
  return store.dispatch(startDeletingCheckedTodos());
};
