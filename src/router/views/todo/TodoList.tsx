import { useLoaderData } from "react-router-dom";

export const TodoList = () => {
  const todos = useLoaderData();
  return <div>{JSON.stringify(todos)}</div>;
};
