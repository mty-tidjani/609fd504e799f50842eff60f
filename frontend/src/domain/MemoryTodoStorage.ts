import Todo from "./Todo";
import { TodoStorage } from "./TodoStorage";

export class MemoryTodoStorage implements TodoStorage {
    private todos: Todo[] = [];

    saveTodos(todos: Todo[]) {
        this.todos = todos
    }

    getTodos(): Todo[] {
         return this.todos
    }
}
