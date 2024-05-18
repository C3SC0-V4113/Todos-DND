import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { LayoutTodo } from "./views/todo/Layout";
import { LayoutAuth } from "./views/auth/Layout";
import { LoginForm } from "./views/auth/LoginForm";
import { useAuthStore } from "@/hooks/useAuthStore";
import { CheckingPage } from "./views/auth/CheckingPage";
import { useUiStore } from "@/hooks/useUiStore";
import { useEffect } from "react";
import { TodoHome } from "./views/todo/TodoHome";
import { CreateTodoAction } from "./actions/todo/CreateTodoAction";
import { useTodoStore } from "@/hooks/useTodoStore";
import { todosLoader } from "./loaders/todo/todosLoader";
import { ProtectedLoader } from "./loaders/auth/ProtectedLoader";
import { AuthLoader } from "./loaders/auth/AuthLoader";
import { CheckingLoader } from "./loaders/auth/CheckingLoader";
import { LoginAction } from "./actions/auth/LoginAction";
import { ReorderTodoAction } from "./actions/todo/ReorderTodoAction";
import { DeleteTodoAction } from "./actions/todo/DeleteTodoAction";

export const TodoRouter = () => {
  const { startGoogleSignIn, startLoginWithEmail, CheckAuth } = useAuthStore();

  const { checkTheme, theme } = useUiStore();

  const {
    startNewTodo,
    startLoadingTodos,
    startReorderTodos,
    startDeletingTodo,
  } = useTodoStore();

  useEffect(() => {
    checkTheme();
  }, [checkTheme, theme]);

  const status = CheckAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutTodo />,
      loader: ProtectedLoader({ status }),
      children: [
        {
          index: true,
          element: <TodoHome />,
          action: CreateTodoAction({ startNewTodo }),
          loader: todosLoader({ startLoadingTodos }),
        },
        {
          path: "order",
          action: ReorderTodoAction({ startReorderTodos }),
        },
        {
          path: "delete",
          action: DeleteTodoAction({ startDeletingTodo }),
        },
        {
          path: "*",
          element: <Navigate to={"/"} />,
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
          loader: AuthLoader({ status }),
          action: LoginAction({ startGoogleSignIn, startLoginWithEmail }),
        },
        {
          path: "register",
          loader: AuthLoader({ status }),
          element: <>Register</>,
        },
        {
          path: "*",
          element: <Navigate to={"/auth"} />,
        },
      ],
    },
    {
      path: "checking",
      element: <CheckingPage />,
      loader: CheckingLoader({ status }),
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};
