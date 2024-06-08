import { store } from "@/store";
import { startNewTodo } from "@/store/todo/todoThunks";
import { ActionFunctionArgs } from "react-router-dom";

export const CreateTodoAction = () => async (actionArg: ActionFunctionArgs) => {
  const formData = await actionArg.request.formData();
  const newTodo = formData.get("todo") as string;
  const { uid } = store.getState().auth;

  return store.dispatch(startNewTodo({ uid: uid!, name: newTodo }));
};
