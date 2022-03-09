import React, { useRef } from "react";
import { useState } from "react";
import Todo from "../domain/Todo";
import { useAppContext } from "./contexts/AppCotext";

export const Router = () => {
  const { createTodo, getTodos } = useAppContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    createTodo(inputRef.current?.value || "");
    setTodos([...getTodos()]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" name="title" id="" />
      </form>

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};
