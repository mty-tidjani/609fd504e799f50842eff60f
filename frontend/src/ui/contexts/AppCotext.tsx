import React from "react";
import { App } from "../../domain/App";
import { MemoryTodoStorage } from "../../domain/MemoryTodoStorage";

const appContext = React.createContext<{
    getTodos: App["getTodos"]
    createTodo: App["createTodo"]
}>({} as any);

export const AppContextProvider: React.FC<any> = ({ children }) => {
  const app = new App(new MemoryTodoStorage());

  return (
    <appContext.Provider
      value={{
        getTodos: () => app.getTodos(),
        createTodo: (title: string) => app.createTodo(title)
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => React.useContext(appContext);
