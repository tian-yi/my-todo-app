import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";
import TodoItem from "./TodoItem";

// const TodoItemsFromOutSide = [
//   { id: "learn-react", labelName: "Learn React" },
//   { id: "create-todo-app", labelName: "Create a todo app" },
//   { id: "profit", labelName: "Profit" },
//   { id: "have-fun", labelName: "Have fun!" },
//   { id: "prettier", labelName: "Prettier is awesome!" },
// ];

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = [
      ...todos,
      { id: newTodo.replace(" ", "-"), labelName: newTodo, completed: false },
    ];
    setTodos(newTodos);
    setNewTodo("");
  };

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    setTodos(JSON.parse(todos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleAll = (e) => {
    const checked = e.target.checked;
    const updatedTodos = todos.map((todo) => {
      return { ...todo, ...{ completed: checked } };
    });

    setTodos(updatedTodos);
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };
  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="What needs to be done?"
            className="new-todo"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
          />
        </form>
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={toggleAll}
          checked={!todos.some((todo) => !todo.completed)}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {todos.map((item) => {
            return (
              <TodoItem
                handleChange={updateTodo}
                key={item.id}
                id={item.id}
                labelName={item.labelName}
                completed={item.completed}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
