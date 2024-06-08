import { store } from "@/store";
import { startReorderTodos } from "@/store/todo/todoThunks";
import { ActionFunctionArgs } from "react-router-dom";

export const ReorderTodoAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todos = JSON.parse(formData.get("todos") as string);
    const { uid } = store.getState().auth;
    return store.dispatch(startReorderTodos({ uid: uid!, todos }));
  };
