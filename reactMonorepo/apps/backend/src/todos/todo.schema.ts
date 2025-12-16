import z from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
  dueDate: z.date(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const createTodoSchema = z.object({
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  dueDate: z.coerce.date(), // Accepts both Date objects and date strings
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type Todo = z.infer<typeof todoSchema>;
