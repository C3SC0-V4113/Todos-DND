import { ActionFunctionArgs } from "react-router-dom";

export const DeleteTodoAction =
  ({
    startDeletingTodo,
  }: {
    startDeletingTodo: (
      todoId: string,
      todoOrder: number
    ) => Promise<
      | {
          payload: string;
          type: "todo/deleteTodo";
        }
      | {
          payload: undefined;
          type: "todo/stopSavingTodo";
        }
    >;
  }) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todoId = formData.get("todoId") as string;
    const todoOrder = formData.get("todoOrder") as string;
    return startDeletingTodo(todoId, +todoOrder);
  };
