import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";
import TodoItem from "./TodoItem";

const ALL = "all";
const ACTIVE = "active";
const COMPLETED = "completed";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [nowShowingTodos, setNowShowingTodos] = useState([]);
  const [todoFilter, setTodoFilter] = useState(ALL);

  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(newTodos);
    let newTodoFromStorage = localStorage.getItem("new-todo");
    if (newTodoFromStorage) {
      newTodoFromStorage = JSON.parse(newTodoFromStorage);
    } else {
      newTodoFromStorage = "";
    }

    setNewTodo(newTodoFromStorage);
  }, []);

  useEffect(() => {
    let newNowShowingTodos;

    if (todoFilter === ACTIVE) {
      newNowShowingTodos = todos.filter((todo) => !todo.completed);
    } else if (todoFilter === COMPLETED) {
      newNowShowingTodos = todos.filter((todo) => todo.completed);
    } else {
      newNowShowingTodos = todos;
    }

    setNowShowingTodos(newNowShowingTodos);
  }, [todos, todoFilter]);

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

  const toggleAll = (checked) => {
    const newTodos = todos.map((todo) => {
      return { ...todo, completed: checked };
    });

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
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={(e) => {
            toggleAll(e.target.checked);
          }}
          checked={!todos.some((todo) => !todo.completed)}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {nowShowingTodos.map((item) => {
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
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.completed).length}</strong>
          {todos.filter((todo) => !todo.completed).length > 1
            ? " items "
            : " item "}
          left
        </span>
        <ul className="filters">
          <li>
            <a
              className={todoFilter === ALL ? "selected" : ""}
              onClick={() => {
                setTodoFilter(ALL);
              }}
              href="#/"
            >
              All
            </a>
          </li>
          <li>
            <a
              className={todoFilter === ACTIVE ? "selected" : ""}
              onClick={() => {
                setTodoFilter(ACTIVE);
              }}
              href="#/active"
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={todoFilter === COMPLETED ? "selected" : ""}
              onClick={() => {
                setTodoFilter(COMPLETED);
              }}
              href="#/completed"
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={() => {
            setTodos(todos.filter((todo) => !todo.completed));
          }}
        >
          Clear Completed
        </button>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
