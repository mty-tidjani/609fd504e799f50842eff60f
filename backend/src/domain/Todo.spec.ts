import { App } from "./App";
import { MemoryTodoStorage } from "./MemoryTodoStorage";
import Todo from "./Todo"

describe('Todo Entity', () => {
    let storage: MemoryTodoStorage

    beforeEach(() => {
        storage = new MemoryTodoStorage()
    })

    it('Should create a Todo', async () => {
        const app = new App(storage);
        await app.createTodo('The title')
        await expect(app.getTodos()).resolves.toEqual([new Todo('The title')])
    });

    it('Should create many Todo', async () => {
        const app = new App(storage);
        await app.createTodo('one')
        await app.createTodo('two')
        await expect(app.getTodos()).resolves.toEqual([new Todo('one'), new Todo('two')])
    });

    it('Should throw if duplicate todo is added', async () => {
        const app = new App(storage);
        await app.createTodo('one')
        await expect(app.createTodo('one')).rejects.toThrow()
    });

    it('Should be sorted alphabetically', async () => {
        const app = new App(storage);
        await app.createTodo('b')
        await app.createTodo('a')
        await expect(app.getTodos()).resolves.toEqual([new Todo('a'), new Todo('b')])
    });

    it('Should arranged by done first', async () => {
        const app = new App(storage);
        await app.createTodo('b')
        await app.createTodo('a')
        await app.createTodo('c')
        await app.markAsDone('c')
        await app.markAsDone('b')
        await expect(app.getTodos()).resolves.toEqual([new Todo('b', 'done'), new Todo('c', 'done'), new Todo('a')])
    });

    it('Should create pending todos', async () => {
        const app = new App(storage);
        app.createTodo('one')
        expect((await app.getTodos())[0].state).toBe('pending')
    });

    it('Should mark a todo as done', async () => {
        const app = new App(storage);
        app.createTodo('one')
        app.markAsDone('one')
        expect((await app.getTodos())[0].state).toBe('done')
    });
})