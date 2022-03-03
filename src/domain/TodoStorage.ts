import Todo from "./Todo";

export interface TodoStorage {
    saveTodos(todos: Todo[]): Promise<void>;
    getTodos(): Promise<Todo[]>;
}