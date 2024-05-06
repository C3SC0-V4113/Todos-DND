import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutTodo } from "./views/todo/Layout";
import App from "@/App";
import { LayoutAuth } from "./views/auth/Layout";
import { LoginForm } from "./views/auth/LoginForm";
import { LoginAction } from "./views/auth/useLoginForm";
import { useAuthStore } from "@/hooks/useAuthStore";

export const TodoRouter = () => {
  const { startGoogleSignIn, startLoginWithEmail } = useAuthStore();

  const router = createBrowserRouter([
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
          action: LoginAction({ startGoogleSignIn, startLoginWithEmail }),
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

  return <RouterProvider router={router} />;
};
