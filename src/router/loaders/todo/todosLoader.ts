import { Todo } from "@/contracts/types/TTodoStore";

export const todosLoader =
  ({ startLoadingTodos }: { startLoadingTodos: () => Promise<Todo[]> }) =>
  async () => {
    const todos = await startLoadingTodos();
    return todos;
  };
