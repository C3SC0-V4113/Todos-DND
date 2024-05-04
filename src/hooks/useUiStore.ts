import { Theme, UIState } from "@/contracts/types/TUiStore";
import { onCheckingTheme, onSetTheme } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: { ui: UIState }) => state.ui);

  const setTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.add(theme);
    localStorage.setItem("ui-theme", theme);
    dispatch(onSetTheme(theme));
  };

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    root.classList.add(newTheme);
    localStorage.setItem("ui-theme", newTheme);
    dispatch(onSetTheme(newTheme));
  };

  const checkTheme = () => {
    const root = window.document.documentElement;
    const themeStorage = localStorage.getItem("ui-theme");

    if (themeStorage) {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      return dispatch(onSetTheme(themeStorage as Theme));
    }

    dispatch(onCheckingTheme());

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      localStorage.setItem("ui-theme", systemTheme);
      dispatch(onSetTheme(systemTheme));
      return;
    }

    root.classList.add(theme);
    localStorage.setItem("ui-theme", theme);
    dispatch(onSetTheme(theme));
  };

  return {
    theme,
    setTheme,
    checkTheme,
    toggleTheme,
  };
};
