import { createTodo } from "./createTodo";
import { deleteCheckedTodos } from "./deleteCheckedTodos";
import { deleteTodo } from "./deleteTodo";
import { getTodos } from "./getTodos";
import { toggleCheckedTodo } from "./toggleCheckedTodo";
import { updateTodosOrder } from "./updateTodosOrder";

export const todos = {
  getTodos,
  createTodo,
  updateTodosOrder,
  deleteTodo,
  toggleCheckedTodo,
  deleteCheckedTodos,
};
