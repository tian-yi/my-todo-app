import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";
import TodoItem from "./TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(newTodos);
    const newTodoFromStorage = JSON.parse(
      localStorage.getItem("new-todo") || ""
    );
    setNewTodo(newTodoFromStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("new-todo", JSON.stringify(newTodo));
  }, [newTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = [
      ...todos,
      { id: newTodo.replace(" ", "-"), labelName: newTodo, completed: false },
    ];
    setTodos(newTodos);
    setNewTodo("");
  };

  const updateTodo = (id) => {
    const newTodos = todos.map((item) => {
      if (item.id == id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
          />
        </form>
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map((item) => {
            return (
              <TodoItem
                key={item.id}
                id={item.id}
                labelName={item.labelName}
                completed={item.completed}
                handleChange={updateTodo}
                handleDelete={deleteTodo}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
