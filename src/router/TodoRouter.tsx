import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
import { LayoutTodo, TodoHome } from "./views/todo";
import {
  CheckingPage,
  LayoutAuth,
  LoginForm,
  RegisterForm,
} from "./views/auth";

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
