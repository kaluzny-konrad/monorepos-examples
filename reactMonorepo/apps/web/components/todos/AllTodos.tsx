"use client";

import { trpc } from "@repo/trpc/client";

export function AllTodos() {
  const todos = trpc.todo.getAllTodos.useQuery();
  return (
    <div>
      {todos.data?.map((todo) => (
        <div key={todo.id}>{todo.name}</div>
      ))}
    </div>
  );
}
