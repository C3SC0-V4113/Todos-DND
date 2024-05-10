import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/hooks/useUiStore";

import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useAuthStore } from "@/hooks/useAuthStore";

export const LayoutTodo = () => {
  const { theme, toggleTheme } = useUiStore();
  const { startLogout } = useAuthStore();

  return (
    <>
      <img
        className="absolute w-full -z-50 sm:hidden"
        src={`/images/bg-mobile-${theme}.jpg`}
        alt={`mobile-background-${theme}`}
      />
      <img
        className="absolute hidden w-full -z-50 sm:block"
        src={`/images/bg-desktop-${theme}.jpg`}
        alt={`desktop-background-${theme}`}
      />
      <div className="flex flex-col justify-between h-screen px-6 py-8">
        <div>
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
              <Button onClick={() => startLogout()} variant={"link"}>
                <CiLogout className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <Outlet />
        </div>
        <p className="text-center">Drag and drop to reorder list</p>
      </div>
    </>
  );
};
