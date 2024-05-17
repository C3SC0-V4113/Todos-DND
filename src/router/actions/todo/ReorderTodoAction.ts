import { Todo } from "@/contracts/types/TTodoStore";
import { ActionFunctionArgs } from "react-router-dom";

export const ReorderTodoAction =
  ({
    startReorderTodos,
  }: {
    startReorderTodos: (todos: Todo[]) => Promise<{
      payload: Todo[];
      type: "todo/updateOrderTodos";
    }>;
  }) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todos = JSON.parse(formData.get("todos") as string);
    console.log(todos);
    return startReorderTodos(todos);
  };
