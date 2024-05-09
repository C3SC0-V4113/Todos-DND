import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { LayoutTodo } from "./views/todo/Layout";
import App from "@/App";
import { LayoutAuth } from "./views/auth/Layout";
import { LoginForm } from "./views/auth/LoginForm";
import { LoginAction } from "./views/auth/useLoginForm";
import { useAuthStore } from "@/hooks/useAuthStore";
import { AuthLoader } from "./views/auth/loaders/AuthLoader";
import { ProtectedLoader } from "./views/auth/loaders/ProtectedLoader";
import { CheckingLoader } from "./views/auth/loaders/CheckingLoader";
import { CheckingPage } from "./views/auth/CheckingPage";
import { useUiStore } from "@/hooks/useUiStore";
import { useEffect } from "react";

export const TodoRouter = () => {
  const { startGoogleSignIn, startLoginWithEmail, CheckAuth } = useAuthStore();

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
          element: <App />,
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
