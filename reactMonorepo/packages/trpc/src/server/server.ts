import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  todo: t.router({
    getTodoById: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.object({
      todo: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        completed: z.boolean(),
        createdAt: z.date(),
        dueDate: z.date(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
      }),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getAllTodos: publicProcedure.output(z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.date(),
      dueDate: z.date(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createTodo: publicProcedure.input(z.object({
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      dueDate: z.coerce.date(), // Accepts both Date objects and date strings
      priority: z.enum(['low', 'medium', 'high']).optional(),
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.date(),
      dueDate: z.date(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateTodo: publicProcedure.input(z.object({
      id: z.string(),
      data: z.object({
        name: z.string(),
        description: z.string(),
        completed: z.boolean(),
        dueDate: z.coerce.date(), // Accepts both Date objects and date strings
        priority: z.enum(['low', 'medium', 'high']).optional(),
      }).partial(),
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.date(),
      dueDate: z.date(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteTodo: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

