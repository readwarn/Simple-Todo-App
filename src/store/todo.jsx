import { createContext, useState, useMemo, useContext } from "react";

const todoInitial = {
  todos: [],
  doneTodos: [],
  activeTodo: null,
  setActiveTodo: () => {},
};

const todoContext = createContext(todoInitial);

const TodoProvider = ({ todos, children }) => {
  const doneTodos = useMemo(() => todos.filter((todo) => todo.done), [todos]);

  const [activeTodo, setActiveTodo] = useState(null);

  const todoState = {
    todos,
    doneTodos,
    activeTodo,
    setActiveTodo: (todo) => setActiveTodo(todo),
  };

  return (
    <todoContext.Provider value={todoState}>{children}</todoContext.Provider>
  );
};

export default TodoProvider;

export const useTodo = () => useContext(todoContext);
