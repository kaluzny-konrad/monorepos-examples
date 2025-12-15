"use client";

import { trpc } from "../../trpc/trpc-client";

export function CreateTodo() {
  const createTodo = trpc.todo.createTodo.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo.mutate({
      name: (e.target as HTMLFormElement).name.toString(),
      description: (e.target as HTMLFormElement).description.value as string,
      completed: false,
      dueDate: new Date(),
      priority: "low",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="description" placeholder="Description" />
      <button type="submit">Create</button>
    </form>
  );
}
