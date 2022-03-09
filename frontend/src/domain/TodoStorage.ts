import Todo from "./Todo";

export interface TodoStorage {
    saveTodos(todos: Todo[]): void;
    getTodos(): Todo[];
}