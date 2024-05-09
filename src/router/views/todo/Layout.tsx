import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/hooks/useUiStore";

import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

export const LayoutTodo = () => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <div className="flex flex-col px-4 py-6">
      <div className="flex justify-between">
        <h1 className="my-auto text-2xl">TODO</h1>
        <div className="flex">
          <Button onClick={() => toggleTheme()} variant={"link"}>
            {theme === "dark" ? (
              <IoSunnySharp className="w-6 h-6" />
            ) : (
              <IoMoonSharp className="w-6 h-6" />
            )}
          </Button>
          <Button variant={"link"}>
            <CiLogout className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <Outlet />
      <p className="text-center">Drag and drop to reorder list</p>
    </div>
  );
};
