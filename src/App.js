import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./main.css";
import PropTypes from "prop-types";

const TodoItem = ({ id, labelName, completed }) => {
  const [checked, setChecked] = useState(completed);
  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  return (
    <li className={checked ? "completed" : ""}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          checked={checked}
        />
        <label htmlFor={id}>{labelName}</label>
      </div>
    </li>
  );
};
TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
let todoItems = [
  { id: "learn-react", labelName: "Learn React", completed: true },
  { id: "create-todo-app", labelName: "Create a todo app", completed: false },
  { id: "profit", labelName: "Profitx", completed: false },
  { id: "have-fun", labelName: "Have fun!", completed: false },
];

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(todoItems);
  console.log(!todos.some((todo) => !todo.completed));
  const createTodo = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        id: newTodo.toLowerCase().replace(" ", "-"),
        labelName: newTodo,
        completed: false,
      },
    ]);
    setNewTodo("");
  };
  const toggleAll = (e) => {
    const checked = e.target.checked;
    const newTodos = todos.map((todo) => {
      return { ...todo, ...{ completed: checked } };
    });

    setTodos(newTodos);
  };
  return (
    <div className="todoapp">
      <header>
        <h1>My todo app</h1>
        <form onSubmit={createTodo}>
          <input
            value={newTodo}
            className="new-todo"
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>
      {todoItems.length > 0 && (
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
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                labelName={item.labelName}
                completed={item.completed}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
