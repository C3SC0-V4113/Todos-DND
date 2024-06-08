import { store } from "@/store";
import { startCheckingTodo } from "@/store/todo/todoThunks";
import { ActionFunctionArgs } from "react-router-dom";

export const UpdateTodoCheckedAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todoId = formData.get("todoId") as string;
    const checked = formData.get("checked") as string;
    const checkedBoolean = checked === "true" ? true : false;

    return store.dispatch(
      startCheckingTodo({
        todoId,
        checked: checkedBoolean,
      })
    );
  };
