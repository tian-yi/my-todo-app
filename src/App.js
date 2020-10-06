import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";
import TodoItem from "./TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [nowShowingTodos, setNowShowingTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoFilter, setTodoFilter] = useState("all");

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
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    let newShowingTodos = [];
    if (todoFilter === "active") {
      newShowingTodos = todos.filter((todo) => todo.completed === false);
    } else if (todoFilter === "completed") {
      newShowingTodos = todos.filter((todo) => todo.completed === true);
    } else {
      newShowingTodos = todos;
    }
    setNowShowingTodos(newShowingTodos);
  }, [todoFilter, todos]);

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
          {nowShowingTodos.map((item) => {
            return (
              <TodoItem
                handleChange={updateTodo}
                handleDelete={deleteTodo}
                key={item.id}
                id={item.id}
                labelName={item.labelName}
                completed={item.completed}
              />
            );
          })}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>
            {todos.filter((todo) => todo.completed !== true).length}
          </strong>{" "}
          {`item${
            todos.filter((todo) => todo.completed !== true).length > 1
              ? "s"
              : ""
          }`}{" "}
          left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className={todoFilter === "all" ? "selected" : ""}
              onClick={() => setTodoFilter("all")}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              className={todoFilter === "active" ? "selected" : ""}
              onClick={() => setTodoFilter("active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              className={todoFilter === "completed" ? "selected" : ""}
              onClick={() => setTodoFilter("completed")}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={() =>
            setTodos(todos.filter((todo) => todo.completed !== true))
          }
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
