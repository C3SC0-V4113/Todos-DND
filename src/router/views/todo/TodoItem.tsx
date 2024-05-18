import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/contracts/types/TTodoStore";
import { useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useFetcher } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const ItemType = "TODO";

export const TodoItem = ({
  todo,
  index,
  moveTodo,
}: {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();

  const FormSchema = z.object({
    ["checked" + index]: z.boolean(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ["checked" + index]: todo.checked,
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      fetcher.submit(
        {
          todoId: todo.id,
          checked: data["checked" + index],
        },
        { method: "put", action: "/checked" }
      );
    },
    [fetcher, index, todo.id]
  );

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveTodo(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const onClick = () => {
    fetcher.submit(
      { todoId: todo.id, todoOrder: todo.order },
      { method: "post", action: "/delete" }
    );
  };

  useEffect(() => {
    const todoChecked = form.watch(() => form.handleSubmit(onSubmit)());
    return () => todoChecked.unsubscribe();
  }, [form, onSubmit]);

  return (
    <div
      ref={ref}
      className={`flex justify-between w-full px-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex gap-2">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name={`checked${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{todo.name}</FormLabel>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <Button variant={"link"} onClick={onClick}>
        <FaTimes className="text-primary-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};
