export const DeleteCheckedTodos =
  ({
    startDeletingCheckedTodos,
  }: {
    startDeletingCheckedTodos: () => Promise<{
      payload: undefined;
      type: "todo/stopSavingTodo";
    }>;
  }) =>
  async () => {
    return startDeletingCheckedTodos();
  };
