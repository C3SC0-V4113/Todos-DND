import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/hooks/useUiStore";
import { useAuthStore } from "@/hooks/useAuthStore";

import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import { CiLogout, CiUser } from "react-icons/ci";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = {
  enableMouseEvents: true,
  enableKeyboardEvents: true,
  delayTouchStart: 500,
};

const getInitials = (displayName: string | null) => {
  if (displayName === null) {
    return "";
  }
  const words = displayName.split(" ");
  if (words.length === 0) {
    return "";
  }
  let initials = "";
  for (let i = 0; i < Math.min(2, words.length); i++) {
    if (words[i].length > 0) {
      initials += words[i][0].toUpperCase();
    }
  }

  return initials;
};

export const LayoutTodo = () => {
  const { theme, toggleTheme } = useUiStore();
  const { startLogout } = useAuthStore();
  const { photoURL, displayName } = useSelector(
    (state: IRootState) => state.auth
  );

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
      <div className="flex flex-col justify-between px-6 py-8 h-dvh">
        <div className="h-full">
          <div className="flex justify-between">
            <h1 className="my-auto text-2xl">TODO</h1>
            <div className="flex">
              <Button onClick={() => toggleTheme()} variant={"link"}>
                {theme === "dark" ? (
                  <IoSunnySharp className="w-6 h-6 text-foreground" />
                ) : (
                  <IoMoonSharp className="w-6 h-6 text-foreground" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={photoURL || ""} />
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-52">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button className="flex w-full gap-3 justify-stretch">
                      <CiUser className="w-6 h-6 text-primary-foreground" />
                      <p className="overflow-hidden text-ellipsis">
                        {displayName}
                      </p>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      className="flex w-full gap-3 justify-stretch"
                      onClick={() => startLogout()}
                    >
                      <CiLogout className="w-6 h-6 text-primary-foreground" />
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DndProvider backend={TouchBackend} options={options}>
            <Outlet />
          </DndProvider>
        </div>
      </div>
    </>
  );
};
