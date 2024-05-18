import { ActionFunctionArgs } from "react-router-dom";

export const UpdateTodoCheckedAction =
  ({
    startCheckingTodo,
  }: {
    startCheckingTodo: (
      todoId: string,
      checked: boolean
    ) => Promise<
      | {
          payload: undefined;
          type: "todo/stopSavingTodo";
        }
      | {
          payload: {
            todoId: string;
            checked: boolean;
          };
          type: "todo/updateTodoChecked";
        }
    >;
  }) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const todoId = formData.get("todoId") as string;
    const checked = formData.get("checked")! as unknown as boolean;

    console.log({
      todoId,
      checked,
    });

    startCheckingTodo(todoId, checked);

    return "Hola";
  };
