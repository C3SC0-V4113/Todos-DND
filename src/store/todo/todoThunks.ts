import API from "@/api/apiServices";
import { Todo } from "@/contracts/types/TTodoStore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const startNewTodo = createAsyncThunk<
  Todo,
  { uid: string; name: string }
>("todo/startNewTodo", async ({ uid, name }, { rejectWithValue }) => {
  const response = await API.todos.createTodo(uid, name);
  if (response.newTodo) {
    return response.newTodo;
  }
  return rejectWithValue(response.errorMessage);
});

export const startLoadingTodos = createAsyncThunk<
  Todo[],
  { uid: string; filter: string }
>("todo/startLoadingTodos", async ({ uid, filter }, { rejectWithValue }) => {
  const response = await API.todos.getTodos(uid, filter);
  if (response.ok) {
    return response.todos;
  }
  return rejectWithValue(response.errorMessage);
});

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
