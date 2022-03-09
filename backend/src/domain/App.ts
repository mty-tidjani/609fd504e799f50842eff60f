import Todo from "./Todo";
import { TodoStorage } from "./TodoStorage";

export class App {
    constructor(private storage: TodoStorage) {}

    async createTodo(title: string) {
        const todos = await this.storage.getTodos()

        const index = todos.findIndex(x => x.title === title)

        if (index >= 0) {
            throw new Error('Todo already exists')
        }

        todos.push(new Todo(title))

        // Order alphabetic
        todos.sort((a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1)

        await this.storage.saveTodos(todos)
    }

    getTodos() {
        return this.storage.getTodos()
    }

    async markAsDone(title: string) {
        const todos = await this.storage.getTodos()
        const index = todos.findIndex(x => x.title === title)
        if (index < 0) {
            throw new Error('Todo not found')
        }
        todos[index].state = 'done';

        // Order alphabetic
        todos.sort((a) => a.state === 'pending' ? 1 : -1)

        await this.storage.saveTodos(todos)
    }
}
