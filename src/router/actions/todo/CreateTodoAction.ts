import { Todo } from "@/contracts/types/TTodoStore";
import { ActionFunctionArgs } from "react-router-dom";

export const CreateTodoAction =
  ({
    startNewTodo,
  }: {
    startNewTodo: (name: string) => Promise<{
      payload: Todo;
      type: "todo/addNewTodo";
    }>;
  }) =>
  async (actionArg: ActionFunctionArgs) => {
    const formData = await actionArg.request.formData();
    const newTodo = formData.get("todo") as string;

    return startNewTodo(newTodo);
  };
