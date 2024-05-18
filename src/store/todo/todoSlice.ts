import { Todo, TodoState } from "@/contracts/types/TTodoStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isSaving: false,
  } as TodoState,
  reducers: {
    savingTodo: (state) => {
      state.isSaving = true;
    },
    stopSavingTodo: (state) => {
      state.isSaving = false;
    },
    addNewTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      state.isSaving = false;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.isSaving = false;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.isSaving = false;
    },
    updateOrderTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.isSaving = false;
    },
    updateTodoChecked: (
      state,
      action: PayloadAction<{ todoId: string; checked: boolean }>
    ) => {
      const updatedTodo = state.todos.find(
        (todo) => todo.id === action.payload.todoId
      );
      if (updatedTodo) {
        updatedTodo.checked = action.payload.checked;
      }
      state.isSaving = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  addNewTodo,
  deleteTodo,
  savingTodo,
  setTodos,
  updateOrderTodos,
  stopSavingTodo,
  updateTodoChecked,
} = todoSlice.actions;
