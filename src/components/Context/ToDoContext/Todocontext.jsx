import { useState, createContext, useEffect } from "react";

export const TodoContext = createContext(null);

export const TodoContextProvider = (props) => {
  const [todo, setTodo] = useState([]);

  const addTodo = (todo_obj) => {
    setTodo((prev) => [...prev, { ...todo_obj }]);
  };

  const updateTodo = (id, todo_obj) => {
    setTodo((prev) =>
      prev.map((prevTodo) => {
        prevTodo.id == id ? { ...todo_obj } : { ...prevTodo };
      })
    );
  };
  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((todo_obj) => todo_obj.id !== id));
  };
  const toggleComplete = (id) => {
    setTodo((prev) =>
      prev.map((todo_obj) =>
        todo_obj.id == id
          ? { ...todo_obj, completed: !todo_obj.completed }
          : todo_obj
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todo"));
    if (todos && todos.length > 0) {
      setTodo(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoContext.Provider
      value={{ todo, setTodo, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

// Basic Structure
// const todo_card = {
//     id: Date.now(),
//     title: title,
//     desc: desc,
//     priority: pri,
//     completed: completed
//  }
