import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";

import Header from "./Header";
import ToggleAll from "./ToggleAll";
import TodoList from "./TodoList";
import Footer from "./Footer";

export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";

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
    let showingTodos = [];
    if (todoFilter === ACTIVE) {
      showingTodos = todos.filter((todo) => todo.completed === false);
    } else if (todoFilter === COMPLETED) {
      showingTodos = todos.filter((todo) => todo.completed === true);
    } else {
      showingTodos = todos;
    }
    setNowShowingTodos(showingTodos);
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
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => todo.completed !== true));
  };
  return (
    <div className="todoapp">
      <Header
        handleSubmit={handleSubmit}
        newTodo={newTodo}
        handleChange={setNewTodo}
      />
      <section className="main">
        <ToggleAll handleChange={toggleAll} todos={todos} />
        <TodoList
          todos={nowShowingTodos}
          handleChange={updateTodo}
          handleDelete={deleteTodo}
        />
      </section>
      <Footer
        todos={todos}
        activeFilter={todoFilter}
        handleClick={setTodoFilter}
        handleClear={clearCompleted}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
