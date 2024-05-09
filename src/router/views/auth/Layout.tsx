import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/hooks/useUiStore";

export const LayoutAuth = () => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <div className="flex flex-col">
      <Button onClick={() => toggleTheme()} variant={"link"}>
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </Button>
      <Outlet />
    </div>
  );
};
