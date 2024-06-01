import { NavLink, useLocation } from "react-router-dom";

export const TodoFilterForm = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { search } = useLocation();
  const filter = new URLSearchParams(search).get("filter");
  const { className } = props;

  return (
    <div
      className={`flex justify-around mt-4 rounded bg-primary text-primary-foreground ${className}`}
    >
      <NavLink
        className={({ isActive, isPending }) =>
          isActive && filter === null
            ? "py-2 font-semibold text-destructive"
            : isPending
            ? "py-2 font-semibold text-primary-foreground"
            : "py-2 font-semibold"
        }
        to={"/"}
      >
        All
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive && filter === "active"
            ? "py-2 font-semibold text-destructive"
            : isPending
            ? "py-2 font-semibold text-primary-foreground"
            : "py-2 font-semibold"
        }
        to={"/?filter=active"}
      >
        Active
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive && filter === "completed"
            ? "py-2 font-semibold text-destructive"
            : isPending
            ? "py-2 font-semibold text-primary-foreground"
            : "py-2 font-semibold"
        }
        to={"/?filter=completed"}
      >
        Completed
      </NavLink>
    </div>
  );
};
