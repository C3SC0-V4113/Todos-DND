import { createBrowserRouter } from "react-router-dom";
import { LayoutTodo } from "./views/todo/Layout";
import App from "@/App";
import { LayoutAuth } from "./views/auth/Layout";
import { LoginForm } from "./views/auth/LoginForm";

export const TodoRouter = createBrowserRouter([
  {
    path: "/",
    element: <LayoutTodo />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
  {
    path: "auth",
    element: <LayoutAuth />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <>Register</>,
      },
      {
        path: "checking",
        element: <>Checking</>,
      },
    ],
  },
]);
