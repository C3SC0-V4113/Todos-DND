import { NavLink } from "react-router-dom";
import { useTodoForm } from "../";

export const TodoFilterForm = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { isSaving, filter } = useTodoForm();
  const { className } = props;

  return (
    <div
      className={`flex relative justify-around mt-4 rounded bg-primary text-primary-foreground ${className}`}
    >
      <div
        className={`absolute w-full h-full bg-primary opacity-50 ${
          isSaving ? "z-50" : "-z-50"
        }`}
      ></div>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive && filter === null
            ? "py-2 font-semibold text-secondary-foreground"
            : isPending
            ? "py-2 font-semibold text-muted-foreground"
            : "py-2 font-semibold text-muted-foreground"
        }
        to={"/"}
      >
        All
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive && filter === "active"
            ? "py-2 font-semibold text-secondary-foreground"
            : isPending
            ? "py-2 font-semibold text-muted-foreground"
            : "py-2 font-semibold text-muted-foreground"
        }
        to={"/?filter=active"}
      >
        Active
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive && filter === "completed"
            ? "py-2 font-semibold text-secondary-foreground"
            : isPending
            ? "py-2 font-semibold text-muted-foreground"
            : "py-2 font-semibold text-muted-foreground"
        }
        to={"/?filter=completed"}
      >
        Completed
      </NavLink>
    </div>
  );
};
