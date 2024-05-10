export type Todo = {
  id: string;
  order: number;
  name: string;
  checked: boolean;
};

export type TodoState = {
  todos: Todo[];
  isSaving: boolean;
};
