export const todosLoader =
  ({ startLoadingTodos }) =>
  () => {
    startLoadingTodos();

    return null;
  };
