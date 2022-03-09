import { App } from "./App";
import { MemoryTodoStorage } from "./MemoryTodoStorage";
import Todo from "./Todo"

describe('Todo Entity', () => {
    let storage: MemoryTodoStorage

    beforeEach(() => {
        storage = new MemoryTodoStorage()
    })

    it('Should create a Todo', () => {
        const app = new App(storage);
        app.createTodo('The title')
        expect(app.getTodos()).toEqual([new Todo('The title')])
    });

    it('Should create many Todo', () => {
        const app = new App(storage);
        app.createTodo('one')
        app.createTodo('two')
        expect(app.getTodos()).toEqual([new Todo('one'), new Todo('two')])
    });

    it('Should throw if duplicate todo is added', () => {
        const app = new App(storage);
        app.createTodo('one')
        expect(() => app.createTodo('one')).toThrow()
    });

    it('Should be sorted alphabetically', () => {
        const app = new App(storage);
        app.createTodo('b')
        app.createTodo('a')
        expect(app.getTodos()).toEqual([new Todo('a'), new Todo('b')])
    });

    it('Should arranged by done first', () => {
        const app = new App(storage);
        app.createTodo('b')
        app.createTodo('a')
        app.createTodo('c')
        app.markAsDone('c')
        app.markAsDone('b')
        expect(app.getTodos()).toEqual([new Todo('b', 'done'), new Todo('c', 'done'), new Todo('a')])
    });

    it('Should create pending todos', () => {
        const app = new App(storage);
        app.createTodo('one')
        expect((app.getTodos())[0].state).toBe('pending')
    });

    it('Should mark a todo as done', () => {
        const app = new App(storage);
        app.createTodo('one')
        app.markAsDone('one')
        expect((app.getTodos())[0].state).toBe('done')
    });
})