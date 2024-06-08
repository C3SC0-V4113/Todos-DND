import { startReorderTodos, store } from "@/store";
import { ActionFunctionArgs } from "react-router-dom";

export const ReorderTodoAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todos = JSON.parse(formData.get("todos") as string);
    return store.dispatch(startReorderTodos({ todos }));
  };
