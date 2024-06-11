import { FaTimes } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/contracts/types/TTodoStore";
import { useTodoForm } from "../";
import { Draggable } from "@hello-pangea/dnd";

export const TodoItem = ({ todo, index }: { todo: Todo; index: number }) => {
  const { onDeleteTodo, onChangeChecked, isSaving } = useTodoForm();

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex border-b last:border-b-0 border-b-muted-foreground justify-between cursor-grab w-full px-2 ${
            snapshot.isDragging ? "opacity-50 cursor-grabbing" : ""
          }`}
        >
          <div className="flex justify-center gap-2 my-auto align-middle">
            <Checkbox
              className="my-auto"
              checked={todo.checked}
              onClick={() => onChangeChecked(todo.checked, todo.id)}
            />
            <label
              className={`my-auto  ${
                todo.checked
                  ? "line-through text-muted-foreground"
                  : "text-primary-foreground"
              }`}
            >
              {todo.name}
            </label>
          </div>
          <Button
            variant={"link"}
            disabled={isSaving}
            onClick={() => onDeleteTodo(todo.id, todo.order)}
          >
            <FaTimes className="text-primary-foreground hover:text-destructive" />
          </Button>
        </div>
      )}
    </Draggable>
  );
};
