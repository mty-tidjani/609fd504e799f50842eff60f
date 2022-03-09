import Todo from "./Todo";
import { TodoStorage } from "./TodoStorage";

export class MemoryTodoStorage implements TodoStorage {
    private todos: Todo[] = [];

    async saveTodos(todos: Todo[]) {
        this.todos = todos
    }

    async getTodos(): Promise<Todo[]> {
         return this.todos
    }
}
