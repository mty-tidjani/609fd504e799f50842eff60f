
export default class Todo {
    constructor(
        public title: string,
        public state: 'pending' | 'done' = "pending"
    ) { }
}