import CreateTodo from "../../components/todos/CreateTodo";
import { AllTodos } from "../../components/todos/AllTodos";

export default function TodosPage() {
  return (
    <div>
      <CreateTodo />
      <AllTodos />
    </div>
  );
}
