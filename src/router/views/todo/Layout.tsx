import { useEffect } from "react";

import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/hooks/useUiStore";

export const LayoutTodo = () => {
  const { checkTheme, theme, toggleTheme } = useUiStore();

  useEffect(() => {
    checkTheme();
  }, [checkTheme, theme]);

  return (
    <div>
      <Button onClick={() => toggleTheme()} variant={"link"}>
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </Button>
      <Outlet />
    </div>
  );
};
