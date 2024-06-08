import { Todo, TodoState } from "@/contracts/types/TTodoStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  startCheckingTodo,
  startDeletingCheckedTodos,
  startDeletingTodo,
  startLoadingTodos,
  startNewTodo,
  startReorderTodos,
} from "./todoThunks";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isSaving: false,
  } as TodoState,
  reducers: {
    clearTodos: (state) => {
      state.isSaving = false;
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startNewTodo.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(startNewTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.isSaving = false;
      })
      .addCase(startNewTodo.rejected, (state, action) => {
        state.isSaving = false;
        console.error(action.payload);
      })
      .addCase(startLoadingTodos.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(
        startLoadingTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
          state.isSaving = false;
        }
      )
      .addCase(startLoadingTodos.rejected, (state, action) => {
        state.isSaving = false;
        console.error(action.payload);
      })
      .addCase(startDeletingCheckedTodos.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(
        startDeletingCheckedTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
          state.isSaving = false;
        }
      )
      .addCase(startReorderTodos.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(
        startReorderTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
          state.isSaving = false;
        }
      )
      .addCase(startDeletingTodo.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(
        startDeletingTodo.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
          state.isSaving = false;
        }
      )
      .addCase(startCheckingTodo.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(
        startCheckingTodo.fulfilled,
        (
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
        }
      );
  },
});
// Action creators are generated for each case reducer function
export const { clearTodos } = todoSlice.actions;
