import Todo from "./Todo";
import { TodoStorage } from "./TodoStorage";

export class App {
    constructor(private storage: TodoStorage) {}

    createTodo(title: string) {
        const todos = this.storage.getTodos()

        const index = todos.findIndex(x => x.title === title)

        if (index >= 0) {
            throw new Error('Todo already exists')
        }

        todos.push(new Todo(title))

        // Order alphabetic
        todos.sort((a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1)

        this.storage.saveTodos(todos)
    }

    getTodos(): Todo[] {
        
        return this.storage.getTodos()
    }

    markAsDone(title: string) {
        const todos = this.storage.getTodos()
        const index = todos.findIndex(x => x.title === title)
        if (index < 0) {
            throw new Error('Todo not found')
        }
        todos[index].state = 'done';

        // Order alphabetic
        todos.sort((a) => a.state === 'pending' ? 1 : -1)

        this.storage.saveTodos(todos)
    }
}
