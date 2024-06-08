import { startDeletingTodo, store } from "@/store";
import { ActionFunctionArgs } from "react-router-dom";

export const DeleteTodoAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todoId = formData.get("todoId") as string;
    const todoOrder = formData.get("todoOrder") as string;
    const orderNumber = +todoOrder;

    return store.dispatch(
      startDeletingTodo({
        todoId,
        todoOrder: orderNumber,
      })
    );
  };
