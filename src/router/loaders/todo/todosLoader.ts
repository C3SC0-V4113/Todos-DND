import { Todo } from "@/contracts/types/TTodoStore";
import { LoaderFunctionArgs } from "react-router-dom";

export const todosLoader =
  ({
    startLoadingTodos,
  }: {
    startLoadingTodos: (filter: string) => Promise<Todo[]>;
  }) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");
    const todos = await startLoadingTodos(filter ? filter : "all");
    return todos;
  };
