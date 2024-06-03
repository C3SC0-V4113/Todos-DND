import API from "@/api/apiServices";
import { Todo } from "@/contracts/types/TTodoStore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const startNewTodo = createAsyncThunk(
  "todo/startNewTodo",
  async ({ uid, name }: { uid: string; name: string }) => {
    const response = await API.todos.createTodo(uid, name);
    if (response.ok) {
      return response.newTodo;
    }
  }
);

export const startLoadingTodos = createAsyncThunk(
  "todo/startLoadingTodos",
  async ({ uid, filter }: { uid: string; filter: string }) => {
    const response = await API.todos.getTodos(uid, filter);
    return response.todos;
  }
);

export const startDeletingCheckedTodos = createAsyncThunk(
  "todo/startDeletingCheckedTodos",
  async (uid: string) => {
    await API.todos.deleteCheckedTodos(uid);
    const response = await API.todos.getTodos(uid, "");
    return response.todos;
  }
);

export const startReorderTodos = createAsyncThunk(
  "todo/startReorderTodos",
  async ({ uid, todos }: { uid: string; todos: Todo[] }) => {
    await API.todos.updateTodosOrder(uid, todos);
    return todos;
  }
);

export const startDeletingTodo = createAsyncThunk(
  "todo/startDeletingTodo",
  async ({
    uid,
    todoId,
    todoOrder,
  }: {
    uid: string;
    todoId: string;
    todoOrder: number;
  }) => {
    await API.todos.deleteTodo(uid, todoId, todoOrder);
    return todoId;
  }
);

export const startCheckingTodo = createAsyncThunk(
  "todo/startCheckingTodo",
  async ({
    uid,
    todoId,
    checked,
  }: {
    uid: string;
    todoId: string;
    checked: boolean;
  }) => {
    await API.todos.toggleCheckedTodo(uid, todoId, checked);
    return { todoId, checked };
  }
);
