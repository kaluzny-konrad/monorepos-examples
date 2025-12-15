import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, Todo } from './todo.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getTodoById(id: string): Todo | undefined {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return undefined;
    }
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  createTodo(todoData: CreateTodoInput): Todo {
    const newTodo = { ...todoData, id: nanoid(), createdAt: new Date() };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: string, data: Partial<CreateTodoInput>): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    const updatedTodo = { ...todo, ...data };
    this.todos = this.todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    return updatedTodo;
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos.splice(index, 1);
    return true;
  }
}
