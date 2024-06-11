import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { LayoutTodo } from "./views/todo/Layout";
import { LayoutAuth } from "./views/auth/Layout";
import { LoginForm } from "./views/auth/LoginForm";
import { CheckingPage } from "./views/auth/CheckingPage";
import { TodoHome } from "./views/todo/TodoHome";
import { RegisterForm } from "./views/auth/RegisterForm";
import { useUiStore } from "@/hooks/useUiStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import {
  CreateTodoAction,
  DeleteCheckedTodos,
  DeleteTodoAction,
  LoginAction,
  RegisterAction,
  ReorderTodoAction,
  UpdateTodoCheckedAction,
} from "./actions";
import {
  AuthLoader,
  CheckingLoader,
  ProtectedLoader,
  todosLoader,
} from "./loaders";

export const TodoRouter = () => {
  const { CheckAuth } = useAuthStore();

  const { checkTheme, theme } = useUiStore();

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
          action: CreateTodoAction(),
          loader: todosLoader(),
        },
        {
          path: "order",
          action: ReorderTodoAction(),
        },
        {
          path: "delete",
          action: DeleteTodoAction(),
        },
        {
          path: "checked",
          action: UpdateTodoCheckedAction(),
        },
        {
          path: "delete-checked",
          action: DeleteCheckedTodos(),
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
          action: LoginAction(),
        },
        {
          path: "register",
          element: <RegisterForm />,
          loader: AuthLoader({ status }),
          action: RegisterAction(),
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
