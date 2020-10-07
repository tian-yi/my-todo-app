import React from "react";

import PropTypes from "prop-types";

import { ALL, ACTIVE, COMPLETED } from "./AppClassComponent";

const Footer = ({ todos, activeFilter, handleClick, handleClear }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>
          {todos.filter((todo) => todo.completed !== true).length}
        </strong>{" "}
        {todos.filter((todo) => todo.completed !== true).length > 1
          ? "items"
          : "item"}{" "}
        left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === ALL ? "selected" : ""}
            onClick={() => handleClick(ALL)}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={activeFilter === ACTIVE ? "selected" : ""}
            onClick={() => handleClick(ACTIVE)}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={activeFilter === COMPLETED ? "selected" : ""}
            onClick={() => handleClick(COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={() => handleClear()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      labelName: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};
export default Footer;
