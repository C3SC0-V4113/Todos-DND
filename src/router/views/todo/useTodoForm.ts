import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Todo } from "@/contracts/types/TTodoStore";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

export const useTodoForm = () => {
  const todos = useLoaderData() as Todo[];
  const [todosState, setTodosState] = useState<Todo[]>(todos);
  const [checkedTodos, setCheckedTodos] = useState(0);
  const [notCheckedTodos, setNotCheckedTodos] = useState(0);
  const { isSaving } = useSelector((state: IRootState) => state.todo);
  const fetcher = useFetcher();
  const { search } = useLocation();

  const filter = new URLSearchParams(search).get("filter");

  const formSchema = z.object({
    todo: z.string().min(4, "Todo must be at least 4 characters long"),
  });

  useEffect(() => {
    setTodosState(todos);
  }, [todos]);

  useEffect(() => {
    if (todosState) {
      setCheckedTodos(
        todosState.filter((todo) => todo.checked === false).length
      );
      setNotCheckedTodos(
        todosState.filter((todo) => todo.checked === true).length
      );
    }
  }, [todosState]);

  const formInput = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmitInput = (values: z.infer<typeof formSchema>) => {
    fetcher.submit(values, {
      method: "POST",
    });

    formInput.reset();
  };

  const onClearComplete = () => {
    fetcher.submit(null, { method: "delete", action: "/delete-checked" });
  };

  const onReorderedTodos = (reorderedTodos: Todo[]) => {
    fetcher.submit(
      { todos: JSON.stringify(reorderedTodos) },
      { method: "post", action: "/order" }
    );
  };

  const onDeleteTodo = (id: string, order: number) => {
    fetcher.submit(
      { todoId: id, todoOrder: order },
      { method: "post", action: "/delete" }
    );
  };

  const onChangeChecked = (checked: boolean, id: string) => {
    fetcher.submit(
      {
        todoId: id,
        checked: !checked,
      },
      { method: "put", action: "/checked" }
    );
  };

  return {
    formInput,
    todosState,
    checkedTodos,
    isSaving,
    filter,
    notCheckedTodos,
    setTodosState,
    onSubmitInput,
    onClearComplete,
    onDeleteTodo,
    onChangeChecked,
    onReorderedTodos,
  };
};
