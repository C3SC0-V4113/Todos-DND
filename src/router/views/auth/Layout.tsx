import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/hooks/useUiStore";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

export const LayoutAuth = () => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <div className="flex flex-col justify-between px-6 py-8 h-dvh">
      <div className="flex flex-col h-full">
        <Button
          className="self-end"
          onClick={() => toggleTheme()}
          variant={"link"}
        >
          {theme === "dark" ? (
            <IoSunnySharp className="w-6 h-6 text-muted-foreground dark:text-foreground" />
          ) : (
            <IoMoonSharp className="w-6 h-6 text-muted-foreground dark:text-foreground" />
          )}
        </Button>
        <Outlet />
      </div>
    </div>
  );
};
