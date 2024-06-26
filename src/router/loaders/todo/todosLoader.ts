import { store } from "@/store";
import { startLoadingTodos } from "@/store/todo/todoThunks";
import { LoaderFunctionArgs } from "react-router-dom";

export const todosLoader =
  () =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");
    return store
      .dispatch(startLoadingTodos({ filter: filter ? filter : "all" }))
      .unwrap();
  };
