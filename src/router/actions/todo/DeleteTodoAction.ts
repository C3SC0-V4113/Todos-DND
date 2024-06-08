import { store } from "@/store";
import { startDeletingTodo } from "@/store/todo/todoThunks";
import { ActionFunctionArgs } from "react-router-dom";

export const DeleteTodoAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todoId = formData.get("todoId") as string;
    const todoOrder = formData.get("todoOrder") as string;
    const orderNumber = +todoOrder;
    const { uid } = store.getState().auth;

    return store.dispatch(
      startDeletingTodo({
        todoId,
        todoOrder: orderNumber,
        uid: uid!,
      })
    );
  };
