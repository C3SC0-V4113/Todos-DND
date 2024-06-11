import API from "@/api/apiServices";
import { Todo } from "@/contracts/types/TTodoStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState } from "../store";
import { toast } from "@/components/ui/use-toast";

export const startNewTodo = createAsyncThunk<Todo, { name: string }>(
  "todo/startNewTodo",
  async ({ name }, { rejectWithValue, getState }) => {
    const { auth } = getState() as IRootState;
    const response = await API.todos.createTodo(auth.uid!, name);
    if (response.newTodo) {
      return response.newTodo;
    }
    toast({
      variant: "destructive",
      title: "Error creating a new Todo",
      description: `${response.errorCode}-${response.errorMessage}`,
    });
    return rejectWithValue(response.errorMessage);
  }
);

export const startLoadingTodos = createAsyncThunk<Todo[], { filter: string }>(
  "todo/startLoadingTodos",
  async ({ filter }, { rejectWithValue, getState }) => {
    const { auth } = getState() as IRootState;
    const response = await API.todos.getTodos(auth.uid, filter);
    if (response.ok) {
      return response.todos;
    }
    toast({
      variant: "destructive",
      title: "Error Loading Todos",
      description: `${response.errorCode}-${response.errorMessage}`,
    });
    return rejectWithValue(response.errorMessage);
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState() as IRootState;
      const fetchStatus = auth.uid;
      if (!fetchStatus) {
        return false;
      }
    },
  }
);

export const startDeletingCheckedTodos = createAsyncThunk(
  "todo/startDeletingCheckedTodos",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as IRootState;
    const deleteResponse = await API.todos.deleteCheckedTodos(auth.uid!);
    if (deleteResponse.ok) {
      const response = await API.todos.getTodos(auth.uid!, "");
      return response.todos;
    }
    toast({
      variant: "destructive",
      title: "Error Deleting all Checked Todos",
      description: `${deleteResponse.errorCode}-${deleteResponse.errorMessage}`,
    });
    return rejectWithValue(deleteResponse.errorMessage);
  }
);

export const startReorderTodos = createAsyncThunk<Todo[], { todos: Todo[] }>(
  "todo/startReorderTodos",
  async ({ todos }, { rejectWithValue, getState }) => {
    const { auth } = getState() as IRootState;
    const response = await API.todos.updateTodosOrder(auth.uid!, todos);
    if (response.ok) {
      return todos;
    }
    const oldList = await API.todos.getTodos(auth.uid!, "");
    toast({
      variant: "destructive",
      title: "Error Reordering Todos",
      description: `${response.errorCode}-${response.errorMessage}`,
    });
    return rejectWithValue({
      errorMessage: response.errorMessage,
      todos: oldList,
    });
  }
);

export const startDeletingTodo = createAsyncThunk<
  string,
  { todoId: string; todoOrder: number }
>(
  "todo/startDeletingTodo",
  async ({ todoId, todoOrder }, { rejectWithValue, getState }) => {
    const { auth } = getState() as IRootState;
    const response = await API.todos.deleteTodo(auth.uid!, todoId, todoOrder);
    if (response.ok) {
      return todoId;
    }
    toast({
      variant: "destructive",
      title: "Error Deleting the Todo",
      description: `${response.errorCode}-${response.errorMessage}`,
    });
    return rejectWithValue(response.errorMessage);
  }
);

export const startCheckingTodo = createAsyncThunk<
  { todoId: string; checked: boolean },
  { todoId: string; checked: boolean }
>(
  "todo/startCheckingTodo",
  async ({ todoId, checked }, { rejectWithValue, getState }) => {
    const { auth } = getState() as IRootState;
    const response = await API.todos.toggleCheckedTodo(
      auth.uid!,
      todoId,
      checked
    );
    if (response.ok) {
      return { todoId, checked };
    }
    toast({
      variant: "destructive",
      title: "Error Checking Todo",
      description: `${response.errorCode}-${response.errorMessage}`,
    });
    return rejectWithValue(response.errorMessage);
  }
);
