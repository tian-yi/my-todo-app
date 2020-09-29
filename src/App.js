import React, { useState } from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

const TodoItem = ({ id, labelName }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        id={id}
        onChange={(e) => {
          console.log(e.target.checked);
        }}
      />
      <label htmlFor={id}>{labelName}</label>
    </div>
  );
};
TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
};
let todoItems = [
  { id: "learn-react", labelName: "Learn React" },
  { id: "create-todo-app", labelName: "Create a todo app" },
  { id: "profit", labelName: "Profitx" },
  { id: "have-fun", labelName: "Have fun!" },
];

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(todoItems);
  const createTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { id: newTodo.toLowerCase().replace(" ", "-"), labelName: newTodo },
    ]);
  };
  return (
    <div className="my-todo-app">
      <h1>My todo app</h1>
      <form onSubmit={createTodo}>
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      </form>
      {todos.map((item) => (
        <TodoItem key={item.id} id={item.id} labelName={item.labelName} />
      ))}
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
